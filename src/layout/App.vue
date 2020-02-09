<template>
  <v-app id="app">
    <v-app-bar app elevate-on-scroll>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="user">
        <span>Olá, {{ user.displayName }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <user-auth></user-auth>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Bolão do Oscar
          </v-list-item-title>
          <v-list-item-subtitle>
            Administração
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item link to="/movies">
          <v-list-item-icon>
            <v-icon>mdi-library-movie</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <span>Filmes</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/categories">
          <v-list-item-icon>
            <v-icon>mdi-view-grid</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <span>Categorias</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/nominees">
          <v-list-item-icon>
            <v-icon>mdi-star-box</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <span>Indicados</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/winners">
          <v-list-item-icon>
            <v-icon>mdi-seal</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <span>Vencedores</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link to="/users">
          <v-list-item-icon>
            <v-icon>mdi-account-supervisor</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <span>Usuários</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/votes">
          <v-list-item-icon>
            <v-icon>mdi-checkbox-multiple-marked</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <span>Votos</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider v-if="user || verifiedAuthState"></v-divider>
        <v-list-item v-if="user" link @click="signOut">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <span>Sair</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="!user && verifiedAuthState"
          link
          @click="signInWithGoogle"
        >
          <v-list-item-icon>
            <v-icon>mdi-google</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <span>Entrar com Google</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import UserAuth from "../components/UserAuth.vue";
import { auth, authProviders } from "../firebase";
export default {
  data() {
    return {
      bottomNav: 4,
      drawer: false,
      drawers: ["Default (no property)", "Permanent", "Temporary"],
      primaryDrawer: {
        model: null,
        clipped: false,
        floating: false,
        mini: false,
      },
      footer: {
        inset: false,
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    verifiedAuthState() {
      return this.$store.state.verifiedAuthState;
    },
  },
  methods: {
    onAuthStateChanged(user) {
      this.$store.commit("setVerifiedAuthState", true);
      if (user) {
        if (user.providerData[0]) {
          this.$store.commit("setUser", user);
        }
      } else {
        this.$store.commit("setUser", false);
      }
    },
    signInWithGoogle() {
      auth.signInWithRedirect(authProviders.google);
    },
    signOut() {
      auth.signOut();
      this.$store.commit("setUser", false);
    },
  },
  components: {
    UserAuth,
  },
  created() {
    // verify auth state
    auth.onAuthStateChanged(this.onAuthStateChanged);
    // bind database collections
    this.$store.dispatch("movies/bindMoviesRef");
    this.$store.dispatch("categories/bindCategoriesRef");
  },
};
</script>

<style></style>
