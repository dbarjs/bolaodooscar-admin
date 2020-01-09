<template>
  <button @click="addMovie()">Add</button>
</template>

<script>
import { database } from "../firebase";
export default {
  name: "MovieButton",
  methods: {
    addMovie: function() {
      database.collection("movies").add({
        title: "",
        year: "",
      });
    },
  },
};
</script>

<style></style>
