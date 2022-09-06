import axios from 'axios';
import debounce from 'lodash.debounce';

export function changeOriginAmount(newAmount) {
    return {
        type: 'CHANGE_ORIGIN_AMOUNT',
        data: { newAmount: newAmount }
    };
}

export function fetchConversionRate(payload) {
    return (dispatch) => {
        makeConversionAjaxCall(payload, dispatch)
    };

}

function _makeConversionAjaxCall(payload, dispatch) {
    // Há dois momentos importantes quando faz um chamada **AJAX**: quando faz a solicitação e quando recebe a resposta
    // então faz sentido ter uma action de solicitação e uma de resposta recebida

    dispatch({ type: 'REQUEST_CONVERSION_RATE', data: payload })

    /*var payload = {
        currentlyEditing: 'origin',
        newValue: newAmount
    };*/


    // ajax call for destination amount
    // originCurrency, destCurrency, originAmount
    axios.get('/api/conversion', {
        params: payload
    })
        .then((resp) => {
            // successCallback(resp.data);
            dispatch({ type: 'RECEIVE_CONVERSION_RATE_SUCCESS', data: resp.data });
        })
        //.catch(failureCallback);
        .catch((err) => {
            dispatch({ type: 'RECEIVE_CONVERSION_RATE_FAILURE', data: err });
        });

    /*// get the new dest amount
    this.makeConversionAjaxCall(payload, (resp) => {
        this.clearErrorMessage();
        // this.props.dispatch({ type: 'MadeConversionCall' });
        dispatch({ type: 'RECEIVE_CONVERSION_RATE', data: resp });
        // this.setState({
        //     conversionRate: resp.xRate,
        //     destinationAmount: resp.destAmount
        // })
    }, this.handleAjaxFailure);*/
}

var makeConversionAjaxCall = debounce(_makeConversionAjaxCall, 300);


export function fetchFees(payload) {
    return (dispatch) => {
        makeFeeAjaxCall(payload, dispatch)
    };

}

function _makeFeeAjaxCall(payload, dispatch) {
    dispatch({ type: 'REQUEST_FEES', data: payload })

    axios.get('/api/fees', {
        params: payload
    })
        .then((resp) => {
            dispatch({ type: 'RECEIVE_FEES_SUCCESS', data: resp.data });
        })
        .catch((err) => {
            dispatch({ type: 'RECEIVE_FEES_FAILURE', data: err });
        });
}

var makeFeeAjaxCall = debounce(_makeFeeAjaxCall, 300);