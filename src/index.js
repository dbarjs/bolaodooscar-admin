/**
 * DOM functions
 */

import "normalize.css";
import app from "./app";

document.body.appendChild(app.element);

/**
 * Global Vue instance config
 */

import Vue from "vue";
import { firestorePlugin } from "vuefire";
import VueSuggestion from "vue-suggestion";
import VueRouter from "vue-router";

// Vuefire
Vue.use(firestorePlugin);

// Vue Suggestion
Vue.use(VueSuggestion);

// Vue Router
import router from "./router";

// Vuetify
import vuetify from "./plugins/vuetify";

Vue.use(VueRouter);

// Global Components, Stores
import App from "./components/App.vue";
import store from "./store";

new Vue({
  el: app.element,
  store,
  router,
  vuetify,
  render: h => h(App),
});
