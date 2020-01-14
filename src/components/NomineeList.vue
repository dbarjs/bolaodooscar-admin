<template>
  <ol class="nominee-list">
    <strong>{{ nominees.length }} indicados</strong>
    <nominee-list-item
      v-for="nominee in nominees"
      v-bind:categoryId="categoryId"
      v-bind:nomineeId="nominee.id"
      :key="nominee.id"
    ></nominee-list-item>
  </ol>
</template>

<script>
import { categoriesRef } from "../firebase";
import NomineeListItem from "./NomineeListItem.vue";
export default {
  components: {
    NomineeListItem,
  },
  data() {
    return {
      nominees: [],
    };
  },
  props: {
    categoryId: { required: true },
  },
  watch: {
    categoryId: {
      immediate: true,
      handler(categoryId) {
        this.$bind(
          "nominees",
          categoriesRef
            .doc(this.categoryId)
            .collection("nominees")
            .orderBy("name", "asc")
        );
      },
    },
  },
};
</script>

<style>
.nominee-list {
  margin: 0;
  padding: 0;
}
</style>
