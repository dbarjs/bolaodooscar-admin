<template>
  <main class="app">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/movies">Go to Movie List</router-link></li>
        <li><router-link to="/categories">Go to Category List</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("movies/bindMoviesRef");
    this.$store.dispatch("categories/bindCategoriesRef");
  },
};
</script>

<style></style>
