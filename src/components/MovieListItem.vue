<template>
  <li class="movie-list-item" @click="active()">
    <p>
      <strong>{{ movieData.title }}</strong>
      <small>({{ movieData.year }})</small>
    </p>
    <p v-if="getOriginalTitle">
      {{ getOriginalTitle }} <small>(Original)</small>
    </p>
    <span>{{ movieData.director }}</span>
    <span v-if="movieData.imdbRating">IMDb: {{ movieData.imdbRating }}</span>
    <span v-if="movieData.metascore"
      >Metacritic: {{ movieData.metascore }}</span
    >
  </li>
</template>

<script>
export default {
  name: "MovieListItem",
  computed: {
    getOriginalTitle() {
      return this.movieData.originalTitle &&
        this.movieData.originalTitle !== this.movieData.title
        ? this.movieData.originalTitle
        : false;
    },
  },
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
  margin-bottom: 1em;
}
</style>
