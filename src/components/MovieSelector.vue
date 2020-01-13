<template>
  <div>
    <vue-suggestion
      :items="movies"
      v-model="movie"
      :setLabel="setLabel"
      :itemTemplate="MovieSelectorItem"
      @changed="inputChange"
      @seleted="itemSelected"
    ></vue-suggestion>
  </div>
</template>

<script>
import MovieSelectorItem from "./MovieSelectorItem.vue";
export default {
  data: function() {
    return {
      movie: {},
      movies: [],
      MovieSelectorItem,
    };
  },
  methods: {
    itemSelected(movie) {
      this.movie = movie;
    },
    setLabel(movie) {
      return movie.title;
    },
    inputChange(text) {
      this.movies = this.$store.getters["movies/getMovieList"].filter(movie => {
        // Movie search method
        if (typeof movie.title === "string") {
          return movie.title.toLowerCase().includes(text);
        }
      });
    },
  },
};
</script>

<style></style>
