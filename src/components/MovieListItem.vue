<template>
  <li class="movie-list-item" @click="active()">
    <p>
      <strong>{{ movieData.title }}</strong>
      <small>({{ movieData.year }})</small>
    </p>
  </li>
</template>

<script>
export default {
  name: "MovieListItem",
  props: {
    movieData: Object,
  },
  methods: {
    active: function() {
      this.$store.commit("setCurrentMovie", this.movieData);
    },
  },
};
</script>

<style>
.movie-list-item {
  display: block;
}
</style>
