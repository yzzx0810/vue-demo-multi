import Vue from 'vue';
import MintUI from 'mint-ui';
import login from './views/login.vue';
import 'lib-flexible';
import store from '../../stores/testStore'

Vue.use(MintUI);
new Vue({
    el: "#main",
    store,
    components: {
        login
    },
    template: "<login></login>"
});