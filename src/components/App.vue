<template>
  <div>
    <h1>Hello World</h1>
    <ul>
      <li v-for="todo in todos" :key="todo['.key']">
        {{ todo.key }} {{ todo }}
        <button @click="removeTodo(todo)">X</button>
      </li>
    </ul>
    <button>Bind!</button>
    <p></p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import firebase from "../firebase";

const db = firebase.database();
const todosRef = db.ref("todos");

export default {
  methods: {},
  computed: mapState(["todos"]),
  created: function() {
    this.source = todosRef;
    this.$store.dispatch("bindTodosRef");
  },
  methods: {
    removeTodo: function(todo) {
      console.log(todo);
      this.source.child(todo[".key"]).set(null);
    }
  }
};
</script>

<style></style>
