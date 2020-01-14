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

// Global Components and Stores
import App from "./components/App.vue";
import store from "./store";

new Vue({
  el: app.element,
  store,
  render: h => h(App),
});
