<template>
  <div>
    <vue-suggestion
      placeholder="Selecione os Filmes"
      :items="movies"
      v-model="movie"
      :setLabel="setLabel"
      :itemTemplate="MovieSelectorItem"
      @changed="inputChange"
      @selected="itemSelected"
    ></vue-suggestion>
  </div>
</template>

<script>
import MovieSelectorItem from "./MovieSelectorItem.vue";
import { moviesRef, categoriesRef } from "../firebase";

export default {
  data: function() {
    return {
      movie: {},
      movies: [],
      MovieSelectorItem,
    };
  },
  props: {
    categoryId: { required: true },
  },
  methods: {
    itemSelected(movie) {
      this.movie = movie;
      this.categoryRef.collection("nominees").add({
        name: movie.title,
        movie: this.movie,
      });
    },
    setLabel(movie) {
      return "";
    },
    inputChange(text) {
      this.movies = this.$store.getters["movies/getMovieList"].filter(movie => {
        if (typeof movie.title === "string") {
          // Copy the 'id' value (the original is read-only)
          movie.movieId = movie.id;
          // Movie search method
          return movie.title.toLowerCase().includes(text.toLowerCase());
        }
      });
    },
  },
  created() {
    this.categoryRef = categoriesRef.doc(this.categoryId);
    this.$store.dispatch("movies/bindMoviesRef");
  },
  beforeUpdate() {
    this.categoryRef = categoriesRef.doc(this.categoryId);
  },
};
</script>

<style></style>
