<template>
  <v-col cols="12">
    <v-card class="nominee-list-item elevation-6" color="#385F73" dark>
      <v-img v-bind:src="getNomineePoster"></v-img>
      <v-card-title class="headline">{{ nominee.name }}</v-card-title>
      <v-card-subtitle v-if="getMovieTitle">
        {{ getMovieTitle }}
      </v-card-subtitle>
      <v-container>
        <v-text-field
          name="name"
          outlined
          dense
          label="Nome do Indicado"
          type="text"
          v-model="nominee.name"
          placeholder="Nome da Indicação"
          @keyup.enter="update($event, 'name', String)"
        ></v-text-field>
        <v-text-field
          name="poster"
          outlined
          dense
          label="Poster do Indicado"
          type="text"
          v-model="nominee.poster"
          placeholder="Poster da Indicação"
          @input="update($event, 'poster', String)"
        ></v-text-field>
      </v-container>
      <v-card-actions>
        <v-btn @click="deleteNominee" text>
          Excluir
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="deleteNominee" icon>
          <v-icon>mdi-sync</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { categoriesRef } from "../firebase";
import autoParse from "auto-parse";
export default {
  data() {
    return {
      nominee: {
        movie: {
          title: ""
        }
      }
    };
  },
  computed: {
    getNomineePoster() {
      return this.nominee.poster
        ? this.nominee.poster
        : this.nominee.movie.poster;
    },
    getMovieTitle() {
      return this.nominee.movie.title !== this.nominee.name
        ? this.nominee.movie.title
        : false;
    }
  },
  props: {
    categoryId: { required: true },
    nomineeId: { required: true }
  },
  methods: {
    deleteNominee() {
      this.source.delete();
    },
    update(event, fieldName, type) {
      // the "event" can be String or a Input Event Object
      const value = event.target ? event.target.value : event;
      this.source.update({
        // method to parse input value
        [fieldName]: autoParse(value.trim(), type)
      });
    }
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
      }
    }
  }
};
</script>

<style lang="sass" scoped>
</style>
