<template>
  <v-list two-line class="user-list" v-if="users">
    <v-list-item v-for="user in users" :key="user.id">
      <v-list-item-avatar>
        <v-img :src="user.providerData.photoURL"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          <span class="user-list-item-name font-weight-bold">
            {{ user.providerData.displayName }}
          </span>
          <span class="user-list-item-provider-id grey--text text--darken-1">
            ({{ user.providerData.providerId }})
          </span>
        </v-list-item-title>
        <v-list-item-subtitle
          v-html="user.providerData.email"
        ></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { usersRef, votesRef } from "../firebase";
export default {
  data() {
    return {
      users: []
    };
  },
  firestore: {
    users: usersRef
  }
};
</script>

<style>
</style>