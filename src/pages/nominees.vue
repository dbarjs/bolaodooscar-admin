<template>
  <category-list
    v-bind:showNominees="true"
    v-bind:showCategoryEditor="false"
    v-bind:showMovieSelector="false"
  ></category-list>
</template>

<script>
import CategoryList from "../components/CategoryList.vue";
export default {
  components: {
    CategoryList
  }
};
</script>

<style>
</style>