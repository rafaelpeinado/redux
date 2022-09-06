import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import debounce from 'lodash.debounce';

import FeesTable from '../components/FeesTable';
// * significa que importará todas as exportações do actions.js
import * as actions from '../actions/actions';

class Conversion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // originAmount: '0.00',
            originCurrency: 'USD',
            // destinationAmount: '0.00',
            destinationCurrency: 'EUR',
            feeAmount: 0.00,
            // conversionRate: 1.5,
            totalCost: 0.00,
            errorMsg: ''
        }

        // bind event listeners so 'this' will be available in the handlers
        this.handleOriginAmountChange = this.handleOriginAmountChange.bind(this);
        this.handleDestAmountChange = this.handleDestAmountChange.bind(this);
        this.handleOriginCurrencyChange = this.handleCurrencyChange.bind(this, 'origin');
        this.handleDestCurrencyChange = this.handleCurrencyChange.bind(this, 'destination');
        this.handleAjaxFailure = this.handleAjaxFailure.bind(this);
    }

    componentDidMount() {
        // Add a debounced version of _getDestinationAmount() so we avoid server & UI Thrashing.
        // See http://stackoverflow.com/questions/23123138/perform-debounce-in-react-js/28046731#28046731
        this.makeConversionAjaxCall = debounce(this._makeConversionAjaxCall, 350);
        this.makeFeeAjaxCall = debounce(this._makeFeeAjaxCall, 350);

        this.originAmountInput.focus();
    }
    // we'll handle all failures the same
    handleAjaxFailure(resp) {
        var msg = 'Error. Please try again later.'

        if (resp && resp.request && resp.request.status === 0) {
            msg = 'Oh no! App appears to be offline.'
        }

        this.setState({
            errorMsg: msg
        })
    }
    // on success ensure no error message
    clearErrorMessage() {
        if (this.state.errorMsg) {
            this.setState({
                errorMsg: ''
            })
        }
    }
    handleCurrencyChange(currentlyEditing, event) {
        var obj = {};
        if (currentlyEditing === 'origin') {
            obj.originCurrency = event.target.value
        } else {
            obj.destinationCurrency = event.target.value
        }

        // just change both...
        // we have to use the callback so `this.state` will reflect the proper values
        // when they are called in _makeConversionAjaxCall()
        this.setState(obj, () => {
            // get new dest amount & conversion rates
            this.makeConversionAjaxCall({}, (resp) => {
                this.clearErrorMessage();

                this.setState({
                    originAmount: resp.originAmount,
                    // destinationAmount: resp.destAmount,
                    destinationAmount: this.props.destinationAmount,
                    conversionRate: resp.xRate
                });

                // get the new fee & total amount
                this.makeFeeAjaxCall({
                    originAmount: resp.originAmount,
                    originCurrency: this.state.originCurrency,
                    destCurrency: this.state.destinationCurrency

                }, (response) => {
                    this.setState({
                        feeAmount: response.feeAmount
                    })

                    this.calcNewTotal();
                }, this.handleAjaxFailure);
            });


        })


    }
    handleOriginAmountChange(event) {
        var newAmount = event.target.value;

        // remove unallowed chars
        newAmount = newAmount.replace(',', '')

        // optimistic field updates
        // this.props.dispatch({ type: "CHANGE_ORIGIN_AMOUNT", data: { newAmount: newAmount } });
        this.props.dispatch(actions.changeOriginAmount(newAmount));

        // Como o redux-thunk foi inserido, podemos passar uma função para dispatch. Quando o dispatch é chamado 
        // com uma função, ele é executado e em seguida o Redux destrói e ignora a função. Essa função por si 
        // só não chama o reducer e isso não afeta o estado do Redux.
        // this.props.dispatch(function(dispatch) {
        //     dispatch({ type: 'SOME_ACTION', data: 'someData' });
        // 
        //     setTimeout(function() {
        //         dispatch({ type: 'CHANGE_ORIGIN_AMOUNT', data: { newAmount: '5000' } });
        //     }, 3000);
        // });

        // this.setState({originAmount: newAmount});

        // isso funcionoaria, mas não teríamos o state antes da action
        // this.props.dispatch({ type: 'MakingConversionCall' });

        //_makeConversionAjaxCall(data, successCallback, failureCallback) {
        var originCurrency = this.state.originCurrency;
        var destCurrency = this.state.destinationCurrency;

        var payload = {
            originAmount: newAmount,
            // destAmount: data.newValue || this.state.destAmount,
            originCurrency: this.state.originCurrency,
            // destCurrency: this.state.destCurrency,
            destCurrency: this.state.destinationCurrency,
            calcOriginAmount: false
        }

        /*// determine whether we need to calc origin or dest amount
        if (data.currentlyEditing === 'dest') {
            payload.calcOriginAmount = true
        }*/
        //}

        this.props.dispatch(actions.fetchConversionRate(payload));

        // this.props.dispatch((dispatch) => {
        //     // Há dois momentos importantes quando faz um chamada **AJAX**: quando faz a solicitação e quando recebe a resposta
        //     // então faz sentido ter uma action de solicitação e uma de resposta recebida

        //     dispatch({ type: 'REQUEST_CONVERSION_RATE', data: payload })

        //     var payload = {
        //         currentlyEditing: 'origin',
        //         newValue: newAmount
        //     };

        //     // get the new dest amount
        //     this.makeConversionAjaxCall(payload, (resp) => {
        //         this.clearErrorMessage();
        //         // this.props.dispatch({ type: 'MadeConversionCall' });
        //         dispatch({ type: 'RECEIVE_CONVERSION_RATE', data: resp });
        //         // this.setState({
        //         //     conversionRate: resp.xRate,
        //         //     destinationAmount: resp.destAmount
        //         // })
        //     }, this.handleAjaxFailure);
        // });

        var feePayload = {
            originAmount: newAmount,
            originCurrency: this.state.originCurrency,
            destCurrency: this.state.destinationCurrency
        };

        this.props.dispatch(actions.fetchFees(feePayload));
    }
    handleDestAmountChange(event) {
        var newAmount = event.target.value;

        // remove unallowed chars
        newAmount = newAmount.replace(',', '')
        // optimistic update
        this.setState({ destinationAmount: newAmount })

        this.makeConversionAjaxCall({
            currentlyEditing: 'dest',
            newValue: newAmount

        }, (resp) => {
            // make ajax call to get the fee amount..
            var newState = {
                conversionRate: resp.xRate,
                originAmount: resp.originAmount
            }

            this.setState(newState)

            // get the new fee & total amount
            this.makeFeeAjaxCall({
                originAmount: resp.originAmount,
                originCurrency: this.state.originCurrency,
                destCurrency: this.state.destinationCurrency

            }, (resp) => {
                this.setState({
                    feeAmount: resp.feeAmount
                })

                this.calcNewTotal();
            }, this.handleAjaxFailure);
        })

    }
    // this is debounced in `componentDidMount()` as this.makeConversionAjaxCall()
    _makeConversionAjaxCall(data, successCallback, failureCallback) {
        var originCurrency = this.state.originCurrency;
        var destCurrency = this.state.destinationCurrency;

        var payload = {
            originAmount: data.newValue || this.props.originAmount,
            destAmount: data.newValue || this.state.destAmount,
            originCurrency: originCurrency,
            destCurrency: destCurrency,
            calcOriginAmount: false
        }

        // determine whether we need to calc origin or dest amount
        if (data.currentlyEditing === 'dest') {
            payload.calcOriginAmount = true
        }

        // ajax call for destination amount
        // originCurrency, destCurrency, originAmount
        axios.get('/api/conversion', {
            params: payload
        })
            .then((resp) => {
                successCallback(resp.data);
            })
            .catch(failureCallback);

    }
    // this is debounced in `componentDidMount()`
    _makeFeeAjaxCall(payload, successCallback, failureCallback) {
        axios.get('/api/fees', {
            params: payload
        })
            .then((resp) => {
                successCallback(resp.data);
            })
            .catch(failureCallback);
    }
    calcNewTotal() {
        var newTotal = parseFloat(this.props.originAmount, 10) + parseFloat(this.props.feeAmount, 10);
        this.setState({ totalCost: parseFloat(newTotal) });
    }

    render() {
        if (this.state.errorMsg) {
            var errorMsg = <div className="errorMsg">{this.state.errorMsg}</div>
        }

        return (
            <div>
                {errorMsg}
                <label>Convert</label>&nbsp;
                <input className="amount-field" ref={input => this.originAmountInput = input} onChange={this.handleOriginAmountChange} value={this.props.originAmount} />
                <select value={this.state.originCurrency} onChange={this.handleOriginCurrencyChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                </select>
                to <input className="amount-field" onChange={this.handleDestAmountChange} value={this.props.destinationAmount} />&nbsp;
                <select value={this.state.destinationCurrency} onChange={this.handleDestCurrencyChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                </select>


                <br /><br /><br />
                <FeesTable
                    originCurrency={this.state.originCurrency}
                    destinationCurrency={this.state.destinationCurrency}
                    conversionRate={this.props.conversionRate}
                    fee={this.props.feeAmount}
                    total={this.props.totalCost}
                />
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        originAmount: state.originAmount,
        destinationAmount: state.destinationAmount,
        conversionRate: state.conversionRate,
        feeAmount: state.feeAmount,
        totalCost: state.totalCost
    };
})(Conversion);
