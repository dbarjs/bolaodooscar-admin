import { firestoreAction } from "vuexfire";
import { moviesRef } from "../../firebase";

const state = {
  movies: [],
};

const getters = {
  getMovieList: state => state.movies,
};

const actions = {
  bindMoviesRef: firestoreAction(context => {
    context.bindFirestoreRef("movies", moviesRef.orderBy("title", "asc"));
  }),
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
};
