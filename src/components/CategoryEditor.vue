<template>
  <v-col cols="12" class="category-editor" v-if="category">
    <v-card color="#385F73" dark>
      <span>{{ category }}</span>
      <v-container grid-list-xs class="pb-0">
        <v-text-field
          outlined
          type="text"
          label="Nome da Categoria"
          v-model="category.name"
          placeholder="Nome"
          @input="update($event, 'name', String)"
        ></v-text-field>
        <v-text-field
          outlined
          type="text"
          label="Nome curto da Categoria"
          v-model="category.shortName"
          placeholder="Nome Curto"
          @input="update($event, 'shortName', String)"
        ></v-text-field>
        <v-text-field
          outlined
          type="number"
          label="Posição"
          v-model="category.order"
          placeholder="order"
          @input="update($event, 'order', Number)"
        ></v-text-field>
      </v-container>
      <v-card-actions>
        <v-btn @click="closeEditor" text>Fechar</v-btn>
        <v-btn @click="deleteCategory" color="red">Excluir Categoria</v-btn>
      </v-card-actions>
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
    update(event, fieldName, type) {
      // the "event" can be String or a Input Event Object
      const value = event.target ? event.target.value : event;
      this.source.update({
        // method to parse input value
        [fieldName]: autoParse(value.trim(), type)
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
