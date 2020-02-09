<template>
  <category-list
    :showCategoryEditor="false"
    :showNominees="false"
    :showWinnerSelect="true"
    :showMovieSelector="false"
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