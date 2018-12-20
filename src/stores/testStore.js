import Vue from 'vue';
import Vuex from 'vuex';
import actions from '../actions/testActions';
import mutations from '../mutations/testMutations';
import getters from '../getters/testGetters';

//test.html全局状态
let state = {
    name: 'china'
};
Vue.use(Vuex);
const testStore = new Vuex.Store({
    strict: true,
    state,
    getters,
    actions,
    mutations
});

export default testStore;