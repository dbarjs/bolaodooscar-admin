import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations, firebaseAction } from "vuexfire";
import firebase from "../firebase";

const database = firebase.database();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
  },

  mutations: { ...vuexfireMutations },

  actions: {
    bindTodosRef: firebaseAction(({ bindFirebaseRef }) => {
      return bindFirebaseRef("todos", database.ref("todos"));
    }),
  },
});
