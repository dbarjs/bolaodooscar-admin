<template>
  <main class="app">
    <movie-selector></movie-selector>
    <category-list></category-list>
    <movie-list></movie-list>
  </main>
</template>

<script>
import CategoryList from "./CategoryList.vue";
import MovieList from "./MovieList.vue";
import MovieSelector from "./MovieSelector.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    CategoryList,
    MovieList,
    MovieSelector,
  },
};
</script>

<style></style>
