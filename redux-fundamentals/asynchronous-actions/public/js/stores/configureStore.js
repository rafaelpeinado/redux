import { applyMiddleware, createStore } from 'redux';
// import logger from 'redux-logger';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

var defaultState = {
    originAmount: '0.00',
    destinationAmount: '0.00',
    conversionRate: 1.5,
    feeAmount: 0.00,
    totalCost: 0.00
};

function amount(state = defaultState, action) {
  // console.log('state', state)
    if (action.type === 'CHANGE_ORIGIN_AMOUNT') {
        return {
            ...state,
            originAmount: action.data.newAmount
        };
    } else if (action.type === 'RECEIVE_CONVERSION_RATE_SUCCESS') {
        return {
            ...state,
            conversionRate: action.data.xRate,
            destinationAmount: action.data.destAmount
        };
    } else if (action.type === 'RECEIVE_FEES_SUCCESS') {
        var newFeeAmount = action.data.feeAmount;
        var newTotal = parseFloat(state.originAmount, 10) + parseFloat(newFeeAmount, 10);
        // this.setState({ totalCost: parseFloat(newTotal) });

        return {
            ...state,
            feeAmount: newFeeAmount,
            totalCost: newTotal
        };
    }

    return state;
}

var logger = createLogger({
    collapsed: true
});

var store = createStore(
    amount,
    // o logger precisa ser o último parâmetro, senão ele vai registar incorretamente
    applyMiddleware(thunk, logger),
);

export default store;
