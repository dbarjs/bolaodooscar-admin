/**
 * DOM functions
 */

import "normalize.css";

const app = {
  element: document.createElement("main"),
};
document.body.appendChild(app.element);

/**
 * Global Vue instance config
 */

import Vue from "vue";

// Vuefire
import { firestorePlugin } from "vuefire";
Vue.use(firestorePlugin);

// Vue Suggestion
import VueSuggestion from "vue-suggestion";
Vue.use(VueSuggestion);

// Vue Router
import VueRouter from "vue-router";
import router from "./router";

Vue.use(VueRouter);

// Global Components, Stores
import App from "./components/App.vue";
import store from "./store";

new Vue({
  el: app.element,
  store,
  router,
  render: h => h(App),
});
