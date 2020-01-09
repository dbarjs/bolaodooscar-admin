<template>
  <li class="movie-list-item">
    <p>
      <strong>{{ movieData.title }}</strong>
      <small>({{ movieData.year }})</small>
    </p>
  </li>
</template>

<script>
export default {
  name: "Message",
  props: {
    movieData: Object,
  },
};
</script>

<style>
.movie-list-item {
  display: block;
}
</style>
