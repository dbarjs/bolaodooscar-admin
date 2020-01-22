<template>
  <v-card max-width="400" class="mx-auto category-section">
    <h1>Categorias</h1>
    <category-editor></category-editor>
    <v-container>
      <v-row>
        <v-col v-for="category in categories" :key="category.id" cols="12">
          <v-card-title>
            {{ category.order }} - {{ category.name }}
          </v-card-title>
          <nominee-list v-bind:categoryId="category.id"></nominee-list>
          <movie-selector v-bind:categoryId="category.id"></movie-selector>
          <v-card-actions>
            <v-btn text @click="setCurrentCategory(category)"
              >Editar Categoria</v-btn
            >
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
    <button @click="addCategory">Criar Categoria</button>
  </v-card>
</template>

<script>
import { categoriesRef } from "../firebase";
import { mapGetters } from "vuex";
import CategoryEditor from "./CategoryEditor.vue";
import NomineeList from "./NomineeList.vue";
import MovieSelector from "./MovieSelector.vue";
export default {
  computed: mapGetters({
    categories: "categories/getCategoryList"
  }),
  methods: {
    setCurrentCategory(category) {
      this.$store.commit("setCurrentCategory", category);
    },
    addCategory() {
      categoriesRef.add({
        name: "Nova Categoria",
        order: this.categories.length + 1
      });
    }
  },
  created() {
    this.source = categoriesRef;
  },
  components: {
    CategoryEditor,
    NomineeList,
    MovieSelector
  }
};
</script>

<style>
</style>
