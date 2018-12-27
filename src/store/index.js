import Vue from 'vue';
import Vuex from 'vuex';
import globalStore from "./globalStore";
import regions from "./regions";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    globalStore,
    regions
  }
});