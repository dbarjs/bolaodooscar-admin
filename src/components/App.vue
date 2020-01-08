<template>
  <div>
    <h1>Lista de Filmes</h1>
    <ul>
      <li v-for="todo in todos" :key="todo['.key']">
        {{ todo.key }} {{ todo }}
        <button @click="removeTodo(todo)">X</button>
      </li>
    </ul>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodo" />
      <button>Add #{{todos.length}}</button>
    </form>
    <p></p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import firebase from "../firebase";

const db = firebase.database();
const todosRef = db.ref("todos");

export default {
  data: function() {
    return {
      newTodo: ""
    };
  },
  computed: mapState(["todos"]),
  created: function() {
    this.source = todosRef;
    this.$store.dispatch("bindTodosRef");
  },
  methods: {
    addTodo: function() {
      if (this.newTodo.trim()) {
        this.source.push({
          text: this.newTodo
        });
        this.newTodo = "";
      }
    },
    removeTodo: function(todo) {
      this.source.child(todo[".key"]).set(null);
    }
  }
};
</script>

<style></style>
