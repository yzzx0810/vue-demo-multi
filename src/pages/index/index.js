import Vue from 'vue';
import VueRouter from 'vue-router';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import 'lib-flexible';

import indexRoutes from '../../routers/indexRoutes';
import first from './views/first.vue';

Vue.use(VueRouter);
Vue.use(MintUI);

const router = new VueRouter({
    mode: "hash",
    routes: indexRoutes
});

new Vue({
    el: "#main",
    router,
    components: {
        first
    },
    template: "<first></first>"
});