<template>
  <div class="movie-editor" v-if="movie">
    <input
      type="text"
      v-model="movie.title"
      placeholder="Title"
      @input="update($event, 'title')"
    />
    <input
      type="text"
      v-model="movie.year"
      placeholder="Year"
      @input="update($event, 'year')"
    />
    <input
      type="text"
      v-model="movie.rate"
      placeholder="Rate"
      @input="update($event, 'rate')"
    />
    <input
      type="text"
      v-model="movie.director"
      placeholder="Director"
      @input="update($event, 'director')"
    />
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
    update(event, fieldName) {
      this.source.update({ [fieldName]: autoParse(event.target.value.trim()) });
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
