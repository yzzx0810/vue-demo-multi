import Vue from 'vue';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import login from './views/first.vue';
import 'lib-flexible';

Vue.use(MintUI);
new Vue({
  el: "#main",
  components: {
    login
  },
  template: "<login></login>"
});