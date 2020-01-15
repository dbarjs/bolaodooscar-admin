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
    </ul>
    <button @click="addMovie()">Adicionar Filme</button>
  </section>
</template>

<script>
import { moviesRef } from "../firebase";
import { mapGetters } from "vuex";
import MovieListItem from "./MovieListItem.vue";
import MovieEditor from "./MovieEditor.vue";
export default {
  computed: mapGetters({
    movies: "movies/getMovieList",
  }),
  methods: {
    addMovie: function() {
      this.source.add({
        imdbId: "",
        title: "",
        year: 2019,
        rate: 0,
      });
    },
  },
  components: {
    MovieListItem,
    MovieEditor,
  },
  created: function() {
    this.source = moviesRef;
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
