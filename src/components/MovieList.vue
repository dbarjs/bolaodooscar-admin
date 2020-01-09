<template>
  <section class="movie-section">
    <h1>Lista de Filmes</h1>
    <movie-editor></movie-editor>
    <ul class="movie-list">
      <movie-list-item
        v-for="movie in movies"
        v-bind:movie-data="movie"
        :key="movie.id"
      ></movie-list-item>
      <movie-button></movie-button>
    </ul>
  </section>
</template>

<script>
import { database } from "../firebase";
import { mapGetters } from "vuex";
import MovieListItem from "./MovieListItem.vue";
import MovieButton from "./MovieButton.vue";
import MovieEditor from "./MovieEditor.vue";
export default {
  computed: mapGetters({
    movies: "movies/getMoviesList",
  }),
  components: {
    MovieListItem,
    MovieButton,
    MovieEditor,
  },
  created: function() {
    this.source = database.collection("movies");
    this.$store.dispatch("movies/bindMoviesRef", this.source);
  },
};
</script>

<style>
.movie-list {
  display: flex;
  flex-flow: column;
  padding: 0;
  margin: 0;
}
</style>
