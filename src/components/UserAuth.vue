<template>
  <div v-if="verifiedAuthState && user">
    <v-avatar size="36">
      <img :src="user.photoURL" :alt="user.displayName" />
    </v-avatar>
  </div>
</template>

<script>
import { auth, authProviders } from "../firebase";
export default {
  data() {
    return {
      authStateVerified: false,
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
  methods: {},
};
</script>

<style></style>
