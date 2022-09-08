// logger middleware
function logger(store) {
  var getState = store.getState;

  return function (next) {
    return function (action) {
      console.log('will dispatch', action);

      // Call the next dispatch method in the middleware chain.
      var returnValue = next(action);

      console.log('state after dispatch', getState());

      // This will likely be the action itself, unless
      // a middleware futher in chain changed it;
      return returnValue;
    };
  };
}

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

var store = createStore(
  rootReducer,
  applyMiddleware(logger)
);

var unsub = store.subscribe(function () {
  console.log('STATE UPDATED', store.getState());
})

console.log('state:before', store.getState());
store.dispatch({ type: 'INCREMENT' });
console.log('state:after', store.getState());

unsub();
store.dispatch({ type: 'INCREMENT' });

function createStore(reducer, enhancer) {
  // o parâmetro passado é o applyMiddleware(logger), isso significa que o enhancer
  // é a primeira função retornada da função applyMiddleware. Então, estamos dizendo
  // que chamar a primeira função que foi retornada, 
  if (typeof enhancer === 'function') {
    // Então, estamos dizendo que chamar a primeira função que foi retornada, passar 
    // na função createStore e, a partir da função que é retornada, passar no reducer.
    return enhancer(createStore)(reducer);
  }

  var state;
  var subscriptions = [];

  // ao fazer o createStore e em seguida fizer um dispatch, o state ainda estará
  // undefined. O dispatch precisa ser executado ao menos uma ve para que o redutor
  // faça o subscribe no state e retorna à função createStore
  // arrumamos isso chamando o dispatch uma vez na função createStore
  // return {
  var obj = {
    getState: function () {
      return state;
    },
    dispatch: function (action) {
      // call the reducer
      // usamos o state = , pois na próxima vez que chamarmos o getState
      // ele retornará o state mais recente. E se não colocarmos, o state
      // será sempre undefined
      state = reducer(state, action);
      // call the subscribed fns
      subscriptions.forEach(function (fn) {
        fn();
      });

      return action;
    },
    subscribe: function (fn) {
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
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var reducer = stateTree[key];
      var subState = state[key];

      state[key] = reducer(subState, action);
    }
    return state;
  }
}

// essa função pode receber um ou vários parâmetros na forma de funções de middleware.
// para facilitar nosso trabalho, vamos usar o operador rest, que é representado por ...
// ou seja, o que isso faz é pegar todos os parâmetros que são passados para essa função,
// e agora nos dará um array com este nome, que é muito mais fácil de se trabalhar
// é muito semelhante ao arguments, mas os arguments não são uma matriz verdadeira. 

// o ... pode ser um operador rest ou de spread, dependendo do contexto
// se for usado em uma matriz ou um objeto, ele será chamado de spread, pois está
// espalhando as propriedades
// nesse caso, ele está tomando o restante dos parâmetros, ou o restante dos argumentos
// e capturando-os no array de funções
function applyMiddleware(...fns) {
  return function (createStore) {

    return function (reducer) {
      var store = createStore(reducer);
      var oldDispatch = store.dispatch;

      // modify dispatch
      store.dispatch = fns.reduceRight(function(prev, curr) {
        return curr(store)(prev); // ie: dispatch = logger(store)(oldDispatch)
      }, oldDispatch);
      // oldDispatch será associado ao prev

      return store;
    }
  }
}


