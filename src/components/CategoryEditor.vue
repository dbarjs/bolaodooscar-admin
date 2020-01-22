<template>
  <v-col cols="12" class="category-editor" v-if="category">
    <v-card color="#385F73" dark>
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
      <v-btn @click="deleteCategory">Excluir Categoria</v-btn>
      <v-btn @click="closeEditor">Fechar Editor</v-btn>
      <p>{{ category }}</p>
    </v-card>
  </v-col>
</template>

<script>
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
  }
};
</script>

<style></style>
