import { firestoreAction } from "vuexfire";
import axios from "axios";

const state = {
  movies: [],
};

const getters = {
  getMovieList: state => state.movies,
};

const actions = {
  bindMoviesRef: firestoreAction((context, collectionRef) => {
    context.bindFirestoreRef("movies", collectionRef.orderBy("title", "asc"));
  }),
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
};
