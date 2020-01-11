<template>
  <section class="category-section">
    <h1>Lista de Categorias</h1>
    <category-editor></category-editor>
    <ul class="category-list">
      <li
        v-for="category in categories"
        class="category-list-item"
        :key="category.id"
        @click="setCurrentCategory(category)"
      >
        <p>{{ category.order }} - {{ category.name }}</p>
      </li>
    </ul>
    <button @click="addCategory">Criar Categoria</button>
  </section>
</template>

<script>
import { categoriesRef } from "../firebase";
import { mapGetters } from "vuex";
import CategoryEditor from "./CategoryEditor.vue";
export default {
  computed: mapGetters({
    categories: "categories/getCategoryList",
  }),
  methods: {
    setCurrentCategory(category) {
      this.$store.commit("setCurrentCategory", category);
    },
    addCategory() {
      categoriesRef.add({
        name: "Nova Categoria",
        order: this.categories.length + 1,
      });
    },
  },
  created() {
    this.source = categoriesRef;
    this.$store.dispatch("categories/bindCategoriesRef", this.source);
  },
  components: {
    CategoryEditor,
  },
};
</script>

<style>
.category-list {
  padding: 0;
  margin: 0;
  display: flex;
  flex-flow: column;
}

.category-list-item {
  /* display: block; */
  min-height: 1em;
}
</style>
