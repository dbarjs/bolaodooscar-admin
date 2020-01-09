<template>
  <div v-if="currentMovie" class="movie-editor">
    <h1>{{ currentMovie.title }}</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["currentMovie"]),
};
</script>

<style>
.movie-editor {
  background-color: red;
}
</style>
