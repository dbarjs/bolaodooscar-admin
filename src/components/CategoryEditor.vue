<template>
  <div class="category-editor" v-if="category">
    <input
      type="text"
      v-model="category.name"
      placeholder="name"
      @input="update($event, 'name')"
    />
    <input
      type="number"
      v-model="category.order"
      placeholder="order"
      @input="update($event, 'order')"
    />
    <movie-selector v-bind:categoryId="category.id"></movie-selector>
    <button @click="deleteCategory">Excluir Categoria</button>
    <button @click="closeEditor">Fechar Editor</button>
    <p>{{ category }}</p>
  </div>
</template>

<script>
import MovieSelector from "./MovieSelector.vue";
import { categoriesRef } from "../firebase";
import autoParse from "auto-parse";
export default {
  computed: {
    category: function() {
      return this.$store.state.currentCategory;
    }
  },
  beforeUpdate() {
    if (this.category.id) {
      this.source = categoriesRef.doc(this.category.id);
    }
  },
  methods: {
    update(event, fieldName) {
      this.source.update({
        [fieldName]: autoParse(event.target.value.trim()) || ""
      });
    },
    deleteCategory() {
      this.source.delete();
      this.closeEditor();
    },
    closeEditor() {
      this.$store.commit("setCurrentCategory", false);
    }
  },
  components: {
    MovieSelector
  }
};
</script>

<style></style>
