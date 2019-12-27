import { rejects } from "assert";

const state = {
  count: 2,
  todos: [
    { id: 1, text: "...", done: true },
    { id: 2, text: "...", done: false },
  ],
};

const mutations = {
  increment(state) {
    state.count++;
  },
  decrement(state) {
    state.count--;
  },
};

const getters = {
  doneTodos: state => {
    return state.todos.filter(todo => todo.done);
  },
  getTodoById(state) {
    return id => state.todos.find(todo => todo.id === id);
  },
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length;
  },
};

const actions = {
  incrementAsync({ commit }) {
    setTimeout(() => {
      commit("increment");
    }, 1000);
  },
  actionA({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit("someMutation"), resolve();
      }, 1000);
    });
  },
  actionB({ commit }) {
    return this.dispatch("actionA").then(() => {
      commit("someOtherMutation");
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
