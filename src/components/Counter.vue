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
    count() {
      return this.$store.state.todolist.count;
    },
    getTodo() {
      return this.$store.getters["todolist/getTodoById"](2);
    },
    doneTodosCount() {
      return this.$store.getters["todolist/doneTodosCount"];
    }
    // ...mapGetters("todolist", {
    // doneTodosCount: "doneTodosCount"
    // })
  },
  created() {}
};
</script>

<style></style>
