<template>
  <section class="movie-section">
    <h1>Lista de Filmes</h1>
    <movie-editor></movie-editor>
    <div class="movie-list">
      <div class="movie-list-wrap">
        <movie-list-item
          v-for="movie in movies"
          v-bind:movie-data="movie"
          :key="movie.id"
        ></movie-list-item>
      </div>
    </div>
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
    movies: "movies/getMovieList"
  }),
  methods: {
    addMovie: function() {
      this.source.add({
        imdbId: "",
        title: "",
        year: 2019,
        rate: 0
      });
    }
  },
  components: {
    MovieListItem,
    MovieEditor
  },
  created: function() {
    this.source = moviesRef;
  }
};
</script>

<style lang="sass">
.movie-list
  display: flex
  width: 100%

  .movie-list-wrap
    display: flex
    flex-flow: row wrap
    justify-content: flex-start
    align-content: flex-start
    padding: 16px 18px 8px
    margin: 0 auto
</style>