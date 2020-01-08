<template>
  <div>
    <h1>Lista de Filmes</h1>
    <p>
      <router-link to="/foo">Go to Foo</router-link>
      <router-link to="/bar">Go to Bar</router-link>
    </p>

    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import firebase from "../firebase";

export default {
  computed: {
    username() {
      return this.$route.params.username;
    },
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
};
</script>

<style></style>
