<template>
  <div>
    <v-card-subtitle>{{ nominees.length }} indicados</v-card-subtitle>
    <v-container class="nominee-list">
      <v-row dense>
        <nominee-list-item
          v-for="nominee in nominees"
          v-bind:categoryId="categoryId"
          v-bind:nomineeId="nominee.id"
          :key="nominee.id"
        ></nominee-list-item>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { categoriesRef } from "../firebase";
import NomineeListItem from "./NomineeListItem.vue";
export default {
  components: {
    NomineeListItem
  },
  data() {
    return {
      nominees: []
    };
  },
  props: {
    categoryId: { required: true }
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
      }
    }
  }
};
</script>

<style>
</style>
