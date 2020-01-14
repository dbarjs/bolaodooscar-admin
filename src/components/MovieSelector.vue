<template>
  <div>
    <vue-suggestion
      placeholder="Selector"
      :items="movies"
      v-model="movie"
      :setLabel="setLabel"
      :itemTemplate="MovieSelectorItem"
      @changed="inputChange"
      @selected="itemSelected"
    ></vue-suggestion>
    {{ categoryId }}
  </div>
</template>

<script>
import MovieSelectorItem from "./MovieSelectorItem.vue";
import { categoriesRef } from "../firebase";

export default {
  data: function() {
    return {
      movie: {},
      movies: [],
      MovieSelectorItem
    };
  },
  props: {
    categoryId: { required: true }
  },
  methods: {
    itemSelected(movie) {
      this.movie = movie;
      this.categoryRef.collection("nominees").add(this.movie);
    },
    setLabel(movie) {
      return movie.title;
    },
    inputChange(text) {
      this.movies = this.$store.getters["movies/getMovieList"].filter(movie => {
        if (typeof movie.title === "string") {
          // Copy the 'id' propertie
          movie.refId = movie.id;
          // Movie search method
          return movie.title.toLowerCase().includes(text);
        }
      });
    }
  },
  created() {
    this.categoryRef = categoriesRef.doc(this.categoryId);
  },
  beforeUpdate() {
    this.categoryRef = categoriesRef.doc(this.categoryId);
  }
};
</script>

<style></style>
