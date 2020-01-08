/**
 * DOM functions
 */

import "normalize.css";

const app = {
  element: document.createElement("main"),
};

document.body.appendChild(app.element);

/**
 * Firebase functions
 */

import firebase from "./firebase";

app.auth = firebase.auth();

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
