import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import debounce from 'lodash.debounce';

import FeesTable from '../components/FeesTable';
import * as actions from '../actions/actions';

class Conversion extends React.Component {
    constructor(props) {
        super(props);

        // bind event listeners so 'this' will be available in the handlers
        this.handleOriginAmountChange = this.handleOriginAmountChange.bind(this);
        this.handleDestAmountChange = this.handleDestAmountChange.bind(this);
        // chamamos o bind no método e passamos 'this', estamos informando que o componente gerado a partir dessa classe
        // classe esteja disponível na palavra-chave this quando o evento React chama esse método
        this.handleOriginCurrencyChange = this.handleOriginCurrencyChange.bind(this);
        this.handleDestCurrencyChange = this.handleDestCurrencyChange.bind(this);
    }

    componentDidMount() {
        this.originAmountInput.focus();
    }

    handleOriginCurrencyChange(event) {
        var newCurrency = event.target.value;
        this.props.dispatch(actions.changeOriginCurrency(newCurrency));

        var payload = {
            originAmount: this.props.originAmount,
            originCurrency: newCurrency,
            destCurrency: this.props.destinationCurrency,
            calcOriginAmount: false
        }

        this.props.dispatch(actions.fetchConversionRate(payload));

        var feePayload = {
            originAmount: this.props.originAmount,
            originCurrency: newCurrency,
            destCurrency: this.props.destinationCurrency
        }

        this.props.dispatch(actions.fetchFees(feePayload));
    }

    handleDestCurrencyChange(event) {
        var newCurrency = event.target.value;
        this.props.dispatch(actions.changeDestCurrency(newCurrency));

        var payload = {
            originAmount: this.props.originAmount,
            originCurrency: this.props.originCurrency,
            destCurrency: newCurrency,
            calcOriginAmount: false
        }

        this.props.dispatch(actions.fetchConversionRate(payload));

        var feePayload = {
            originAmount: this.props.originAmount,
            originCurrency: this.props.originCurrency,
            destCurrency: newCurrency
        }

        this.props.dispatch(actions.fetchFees(feePayload));
    }

    handleOriginAmountChange(event) {
        var newAmount = event.target.value;

        // remove unallowed chars
        newAmount = newAmount.replace(',','')

        // optimistic field updates
        this.props.dispatch(actions.changeOriginAmount(newAmount));

        var payload = {
            originAmount: newAmount,
            originCurrency: this.props.originCurrency,
            destCurrency: this.props.destinationCurrency,
            calcOriginAmount: false
        }

        this.props.dispatch(actions.fetchConversionRate(payload));

        var feePayload = {
            originAmount: newAmount,
            originCurrency: this.props.originCurrency,
            destCurrency: this.props.destinationCurrency
        }

        this.props.dispatch(actions.fetchFees(feePayload));

    }

    handleDestAmountChange(event) {
        var newAmount = event.target.value;

        // remove unallowed chars
        newAmount = newAmount.replace(',','')

        // optimistic field updates
        this.props.dispatch(actions.changeDestAmount(newAmount));

        var payload = {
            destAmount: newAmount,
            originCurrency: this.props.originCurrency,
            destCurrency: this.props.destinationCurrency,
            // esse parâmetro indica para a API que não conhecemos o originAmount e queremos calcular a partir do 
            // destinationAmount
            calcOriginAmount: true
        }

        // As duas chamadas fetchConversionRate e fetchFees são chamadas em paralelo. Assim que o primeiro dispatch ocorre,
        // o segundo dispatch acontece logo em seguida. Precisamos esperar que o primeiro volte, para que a possamos usar
        // o originAmount que é retornado na primeira chamada da API.
       /* this.props.dispatch(actions.fetchConversionRate(payload));

        this.props.dispatch(actions.fetchFees(feePayload));*/

        // aqui faremos as duas chamadas dentro do reducer
        this.props.dispatch(actions.fetchConversionRateAndFees(payload));
    }

    render() {
        if (this.props.errorMsg) {
            var errorMsg = <div className="errorMsg">{this.props.errorMsg}</div>
        }

        return (
            <div>
                {errorMsg}
                <label>Convert</label>&nbsp;
                <input className="amount-field" ref={input => this.originAmountInput = input} onChange={this.handleOriginAmountChange} value={this.props.originAmount} />
                <select value={this.props.originCurrency} onChange={this.handleOriginCurrencyChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                </select>
                to <input className="amount-field" onChange={this.handleDestAmountChange} value={this.props.destinationAmount} />&nbsp;
                <select value={this.props.destinationCurrency} onChange={this.handleDestCurrencyChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                </select>


                <br/><br/><br/>
                <FeesTable
                    originCurrency={this.props.originCurrency}
                    destinationCurrency={this.props.destinationCurrency}
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
        originAmount: state.amount.originAmount,
        destinationAmount: state.amount.destinationAmount,
        originCurrency: state.amount.originCurrency,
        destinationCurrency: state.amount.destinationCurrency,
        conversionRate: state.amount.conversionRate,
        feeAmount: state.amount.feeAmount,
        totalCost: state.amount.totalCost,
        errorMsg: state.error.errorMsg
    }

})(Conversion);
