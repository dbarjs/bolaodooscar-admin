<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Done Todos: {{ doneTodosCount }}</p>
    <p>Done Todos: {{ getTodo }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  methods: {
    increment() {
      this.$store.dispatch("todolist/incrementAsync");
    },
    decrement() {
      this.$store.commit("todolist/decrement");
    },
    testAction() {
      this.$store.dispatch("todolist/actionA").then(() => {});
    }
  },
  computed: {
    ...mapState("todolist", ["count"]),
    ...mapGetters("todolist", ["doneTodosCount"]),
    getTodo() {
      return this.$store.getters["todolist/getTodoById"](2);
    }
  },
  created() {}
};
</script>

<style></style>
