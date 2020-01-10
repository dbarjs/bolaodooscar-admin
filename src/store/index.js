import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations } from "vuexfire";
import movies from "./modules/movies";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentMovie: false,
    currentMovieTitle: false,
  },
  getters: {
    currentMovie: state => state.currentMovie,
  },
  mutations: {
    ...vuexfireMutations,
    setCurrentMovieTitle(state, movieTitle) {
      state.currentMovieTitle = movieTitle;
    },
    setCurrentMovie(state, movie) {
      state.currentMovie = movie ? movie : false;
    },
  },
  modules: { movies },
});
