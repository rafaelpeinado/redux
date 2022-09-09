import keyMirror from 'keymirror';

// export var ActionTypes = {
//     CHANGE_ORIGIN_AMOUNT: 'CHANGE_ORIGIN_AMOUNT',
// }

export var ActionTypes = keyMirror({
    CHANGE_ORIGIN_AMOUNT: null,
    REQUEST_CONVERSION_RATE: null,
    RECEIVED_CONVERSION_RATE_SUCCESS: null,
    RECEIVED_CONVERSION_RATE_FAILURE: null,
    REQUEST_FEES: null,
    RECEIVED_FEES_SUCCESS: null,
    RECEIVED_FEES_FAILURE: null,
});
