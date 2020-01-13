<template>
  <div class="movie-editor" v-if="movie">
    <input
      type="text"
      v-model="movie.imdbId"
      placeholder="IMDB ID"
      @input="update($event, 'imdbId', String)"
    />
    <input
      type="text"
      v-model="movie.title"
      placeholder="Title"
      @input="update($event, 'title', String)"
    />
    <input
      type="number"
      v-model="movie.year"
      placeholder="Year"
      @input="update($event, 'year', Number)"
    />
    <input
      type="number"
      v-model="movie.rate"
      step="0.1"
      placeholder="Rate"
      @input="update($event, 'rate', Number)"
    />
    <input
      type="text"
      v-model="movie.director"
      placeholder="Director"
      @input="update($event, 'director', String)"
    />
    <button @click="deleteMovie">Excluir Filme</button>
    <button @click="closeEditor">Fechar editor</button>
  </div>
</template>

<script>
import { moviesRef } from "../firebase";
import autoParse from "auto-parse";
export default {
  computed: {
    movie: function() {
      return this.$store.state.currentMovie;
    },
  },
  methods: {
    update(event, fieldName, type) {
      this.source.update({
        // method to parse input value
        [fieldName]: autoParse(event.target.value.trim(), type),
      });
    },
    closeEditor() {
      this.$store.commit("setCurrentMovie", false);
    },
    deleteMovie() {
      this.source.delete();
      this.closeEditor();
    },
  },
  beforeUpdate: function() {
    if (this.movie.id) {
      this.source = moviesRef.doc(this.movie.id);
    }
  },
};
</script>

<style>
.movie-editor {
  background-color: red;
  display: flex;
  flex-flow: column;
}
</style>
