// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App'
import router from './router'
import './fbsdk'

export const eventBus = new Vue()

Vue.use(Vuelidate);

Vue.config.productionTip = false

// Vue.directive("auto-focus", {
//   bind: function () {
//     Vue.nextTick(function () {
//       this.$el.focus();
//     }.bind(this));
//   }
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
