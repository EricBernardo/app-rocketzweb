import '@/icons'; // icon
import '@/permission'; // permission control
import '@/styles/index.scss'; // global css
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/pt-br'; // lang i18n
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import money from 'v-money';
import Vue from 'vue';
import VueMoment from 'vue-moment';
import VueTheMask from 'vue-the-mask';
import App from './App';
import router from './router';
import store from './store';

// set ElementUI lang to EN
Vue.use(ElementUI, {
  locale
})

Vue.component('pagination', require('laravel-vue-pagination'))

Vue.use(VueTheMask)

Vue.use(VueMoment)

Vue.use(money, {
  decimal: ",",
  thousands: ".",
  prefix: "R$ ",
  precision: 2,
  masked: false
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
