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

new Vue({
  el: app.element,
  store,
  render: h => h(App),
});
