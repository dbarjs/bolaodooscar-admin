/**
 * DOM functions
 */

import "normalize.css";

const app = {
  element: document.createElement("main"),
};
document.body.appendChild(app.element);

/**
 * Vue instance here
 */

import Vue from "vue";
import App from "./components/App.vue";
import store from "./store";

import VueSuggestion from "vue-suggestion";
Vue.use(VueSuggestion);

new Vue({
  el: app.element,
  store,
  render: h => h(App),
});
