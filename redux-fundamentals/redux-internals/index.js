
var defaultAppleState = 0;

function apple(state = defaultAppleState, action) {
  if (action.type === 'INCREMENT') {
    return state + 1;
  }

  return state;
}

var defaultOrangeState = 10;

function orange(state = defaultOrangeState, action) {
  if (action.type === 'EAT_ORANGE') {
    return state - 1;
  }

  return state;
}

var rootReducer = combineReducers({
  apple: apple,
  orange: orange
});

var store = createStore(rootReducer);

var unsub = store.subscribe(function() {
  console.log('STATE UPDATED', store.getState());
})

console.log('state:before', store.getState());
store.dispatch({type: 'INCREMENT'});
console.log('state:after', store.getState());

unsub();
store.dispatch({type: 'INCREMENT'});

function createStore(reducer) {
  var state;
  var subscriptions = [];

  // ao fazer o createStore e em seguida fizer um dispatch, o state ainda estará
  // undefined. O dispatch precisa ser executado ao menos uma ve para que o redutor
  // faça o subscribe no state e retorna à função createStore
  // arrumamos isso chamando o dispatch uma vez na função createStore
  // return {
  var obj = {
    getState: function() {
      return state;
    },
    dispatch: function(action) {
      // call the reducer
      // usamos o state = , pois na próxima vez que chamarmos o getState
      // ele retornará o state mais recente. E se não colocarmos, o state
      // será sempre undefined
      state = reducer(state, action);
      // call the subscribed fns
      subscriptions.forEach(function(fn) {
        fn();
      });
    },
    subscribe: function(fn) {
      // call functions when dispatch is called
      subscriptions.push(fn);
      // returns an unsubscribe function
      return function unsubscribe() {
        // find listener fn in sub array and remove it
        var index = subscriptions.indexOf(fn);
        subscriptions.splice(index, 1);
      }
    }
  };

  obj.dispatch({ type: 'REDUX_INIT' });
  return obj;
}

function combineReducers(stateTree) {
  var keys = Object.keys(stateTree);

  return function rootReducer(state = {}, action) {
    for (var i=0; i < keys.length; i++) {
      var key = keys[i];
      var reducer = stateTree[key];
      var subState = state[key];

      state[key] = reducer(subState, action);
    }
    return state;
  }
}




