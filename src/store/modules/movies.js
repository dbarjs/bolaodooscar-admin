import { firestoreAction } from "vuexfire";

const state = {
  movies: [],
};

const getters = {
  getMoviesList: state => {
    return state.movies;
  },
};

const actions = {
  bindMoviesRef: firestoreAction((context, collectionRef) => {
    context.bindFirestoreRef("movies", collectionRef);
  }),
  setMovie(state, movie) {
    console.log(movie);
    // state.movies = movie ? movie : false;
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
};
