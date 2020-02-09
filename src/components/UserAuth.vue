<template>
  <div v-if="authStateVerified">
    <div v-if="user">
      <div class="status">Conectado como: {{ user.displayName }}</div>
      <v-btn color="red lighten-1" @click="signInWithgoogle">
        Sair
      </v-btn>
    </div>
    <div v-else>
      <v-btn color="success" @click="signInWithgoogle">
        Log In with Google
      </v-btn>
    </div>
  </div>
</template>

<script>
import { auth, authProviders } from "../firebase";
export default {
  data() {
    return {
      user: false,
      authStateVerified: false
    };
  },
  methods: {
    onAuthStateChanged(user) {
      this.authStateVerified = true;
      if (user) {
        if (user.providerData[0]) {
          // set "user" data on Firestore
          this.user = user;
        }
      } else {
        this.user = false;
      }
    },
    signInWithgoogle() {
      auth.signInWithRedirect(authProviders.google);
    }
  },
  created() {
    auth.onAuthStateChanged(this.onAuthStateChanged);
  }
};
</script>

<style>
</style>