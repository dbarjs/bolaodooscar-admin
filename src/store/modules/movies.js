import { firestoreAction } from "vuexfire";

const state = {
  movies: [],
};

const getters = {
  getMovieList: state => state.movies,
};

const actions = {
  bindMoviesRef: firestoreAction((context, collectionRef) => {
    context.bindFirestoreRef("movies", collectionRef);
  }),
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
};
