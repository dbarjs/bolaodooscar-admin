<template>
  <button @click="addMovie()">Adicionar Filme</button>
</template>

<script>
import { database } from "../firebase";
export default {
  name: "MovieButton",
  methods: {
    addMovie: function() {
      database.collection("movies").add({
        imdbId: "",
        title: "",
        year: 2019,
        rate: 0,
      });
    },
  },
};
</script>

<style></style>
