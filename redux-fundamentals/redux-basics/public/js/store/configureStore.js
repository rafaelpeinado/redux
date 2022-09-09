import { createStore } from 'redux';

var defaultState = {
    originAmount: '0.00'  
};

// variável reducer
// no ES6 state = defaultState é o mesmo que state = state || defaultState;
// obs: quando criamos o store, ele chama o dispatch uma vez, por isso estava retornando 2, por isso +
// foi preciso definir type, para ele incrementar só quando o type INCREMENT for chamado
function amount(state = defaultState, action) {
    // state = state || defaultState;
    console.log('state', state);
    if (action.type === 'CHANGE_ORIGIN_AMOUNT'){
        // estamos quebrando uma das principais e mais difíceis regras do redux, que é não podemos
        // alterar o state. Só podemos fazer atualizações imutáveis, pois quando alteramos o objeto
        // diretamente, perdemos todo o histórico de atualizações do estado, e o redux usa o histórico
        // para fazer comparações para ver se o STATE mudou.
        // state.originAmount = action.data; então:

        // podemos usar outra sintaxe para esse retorno
        // return Object.assign({}, state, { originAmount: action.data }); então:

        // ... é chamado de Operador de Propagação de Objeto (Object Spread)
        // ... copia e espelha todo o objeto e ainda atualiza com o novo action.data
        // ... é equivalente a Object.assign({}, state, { originAmount: action.data });
        return {
            ...state,
            originAmount: action.data.newAmount
        }
    }
    return state;

    // return action.type === 'CHANGE_ORIGIN_AMOUNT' ? Object.assign({}, state, { originAmount: action.data }) : state;
}

// com o STORE queremos ou atualizar ou definir o STATE
var store = createStore(amount);

/*
// podemos usar subscribe nas atualizações do store
store.subscribe(function() {
    console.log('state', store.getState());
});
// REDUCER é um conjunto que é executado toda vez que uma ação é disparado no STORE
// a forma de atualizar um reducer daquele store é usando um dispatch, que dispara uma ação
// e essa ação dever ser um objeto
store.dispatch({
    type: 'CHANGE_ORIGIN_AMOUNT',
    data: '300.65'
});
store.dispatch({
    type: ''
});*/

export default store;