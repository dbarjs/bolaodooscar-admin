import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations } from "vuexfire";
import movies from "./modules/movies";

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {
    ...vuexfireMutations,
  },
  modules: { movies },
});
