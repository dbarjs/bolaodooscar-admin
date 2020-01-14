<template>
  <main class="app">
    <category-list></category-list>
    <movie-list></movie-list>
  </main>
</template>

<script>
import CategoryList from "./CategoryList.vue";
import MovieList from "./MovieList.vue";

import { mapActions, mapState } from "vuex";

export default {
  components: {
    CategoryList,
    MovieList
  }
};
</script>

<style></style>
