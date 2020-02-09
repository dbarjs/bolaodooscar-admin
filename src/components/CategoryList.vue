<template>
  <v-card max-width="400" class="mx-auto category-section">
    <h1>Categorias</h1>
    <category-editor v-if="showCategoryEditor"></category-editor>
    <v-container>
      <v-row>
        <v-col v-for="category in categories" :key="category.id" cols="12">
          <v-card-title>
            {{ category.order }} - {{ category.name }}
          </v-card-title>
          <winner-select
            v-if="showWinnerSelect"
            :categoryId="category.id"
            :categoryWinner="category.winner"
          ></winner-select>
          <nominee-list
            v-if="showNominees"
            v-bind:categoryId="category.id"
          ></nominee-list>
          <movie-selector
            v-if="showMovieSelector"
            v-bind:categoryId="category.id"
          ></movie-selector>
          <v-card-actions v-if="showCategoryEditor">
            <v-btn color="primary" text @click="setCurrentCategory(category)">
              Editar Categoria
            </v-btn>
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
import MovieSelector from "./MovieSelector.vue";
import NomineeList from "./NomineeList.vue";
import WinnerSelect from "./WinnerSelect.vue";
export default {
  props: {
    showNominees: {
      type: Boolean,
      default: true
    },
    showCategoryEditor: {
      type: Boolean,
      default: true
    },
    showMovieSelector: {
      type: Boolean,
      default: true
    },
    showWinnerSelect: {
      type: Boolean,
      default: false
    }
  },
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
    MovieSelector,
    NomineeList,
    WinnerSelect
  }
};
</script>

<style>
</style>
