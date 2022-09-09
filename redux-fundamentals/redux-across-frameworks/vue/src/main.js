// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import store from './reduxState';

Vue.config.productionTip = false;

// default state
var reduxState = {
  fields: store.getState().fields
};

// isso cuida das atualizações
var unsub = store.subscribe(function() {
  var state = store.getState();

  // bindings
  // quando houver alguma atualização, diremos ao reduxState.fields receba state.fields. Então, em vez
  // de substituir todo o objeto reduxState, estamos simplesmente alterando o filho e substituindo
  // esse filho pela nova matriz de campos. Isso permite que o reduxState viva, e então o Vue pode
  // escutar quaisquer mutações de filhos.
  reduxState.fields = state.fields;

});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  // essa propriedade agora existe para esse aplicativo Vue e podemos acessá-lo a partir dos 
  // componentes filhos. Ou seja, isso cuida do caso de carregamento inicial.
  data: reduxState
})
