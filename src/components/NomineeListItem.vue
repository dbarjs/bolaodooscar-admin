<template>
  <li class="nominee-list-item">
    <input
      type="text"
      v-model="nominee.name"
      placeholder="Nome da Indicação"
      @keyup.enter="update($event, 'name', String)"
    />
    <span v-if="getMovieTitle">
      {{ getMovieTitle }}
    </span>
    <button @click="deleteNominee">Apagar Indicação</button>
  </li>
</template>

<script>
import { categoriesRef } from "../firebase";
import autoParse from "auto-parse";
export default {
  data() {
    return {
      nominee: {
        movie: {
          title: "",
        },
      },
    };
  },
  computed: {
    getMovieTitle() {
      return this.nominee.movie.title !== this.nominee.name
        ? this.nominee.movie.title
        : false;
    },
  },
  props: {
    categoryId: { required: true },
    nomineeId: { required: true },
  },
  methods: {
    deleteNominee() {
      this.source.delete();
    },
    update(event, fieldName, type) {
      this.source.update({
        // method to parse input value
        [fieldName]: autoParse(event.target.value.trim(), type),
      });
    },
  },
  watch: {
    categoryId: {
      immediate: true,
      handler() {
        this.source = categoriesRef
          .doc(this.categoryId)
          .collection("nominees")
          .doc(this.nomineeId);
        this.$bind("nominee", this.source);
      },
    },
  },
};
</script>

<style lang="sass" scoped>
.nominee-list-item
  display: flex
  flex-flow: column
  margin-bottom: 0.5em
</style>
