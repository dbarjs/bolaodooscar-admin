<template>
  <v-app id="app">
    <user-auth></user-auth>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer app>
      <v-bottom-navigation v-model="bottomNav" fixed dark>
        <v-btn to="/movies">
          <span>Filmes</span>
          <v-icon>mdi-library-movie</v-icon>
        </v-btn>
        <v-btn to="/categories">
          <span>Categorias</span>
          <v-icon>mdi-view-grid</v-icon>
        </v-btn>
        <v-btn to="/nominees">
          <span>Indicados</span>
          <v-icon>mdi-star-box</v-icon>
        </v-btn>
        <v-btn to="/winners">
          <span>Vencedores</span>
          <v-icon>mdi-seal</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
import UserAuth from "../components/UserAuth.vue";
export default {
  data() {
    return {
      bottomNav: 4,
      drawers: ["Default (no property)", "Permanent", "Temporary"],
      primaryDrawer: {
        model: null,
        clipped: false,
        floating: false,
        mini: false
      },
      footer: {
        inset: false
      }
    };
  },
  components: {
    UserAuth
  },
  created() {
    this.$store.dispatch("movies/bindMoviesRef");
    this.$store.dispatch("categories/bindCategoriesRef");
  }
};
</script>

<style></style>
