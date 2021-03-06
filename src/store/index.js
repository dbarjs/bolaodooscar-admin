import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations } from "vuexfire";
import movies from "./modules/movies";
import categories from "./modules/categories";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: false,
    verifiedAuthState: false,
    currentMovie: false,
    currentCategory: false,
  },
  getters: {
    currentMovie: state => state.currentMovie,
    currentCategory: state => state.currentCategory,
  },
  mutations: {
    ...vuexfireMutations,
    setCurrentCategory(state, category) {
      state.currentCategory = category ? category : false;
    },
    setCurrentMovie(state, movie) {
      state.currentMovie = movie ? movie : false;
    },
    setUser(state, user) {
      state.user = user;
    },
    setVerifiedAuthState(state, value) {
      state.verifiedAuthState = !!value;
    },
  },
  modules: { categories, movies },
});
