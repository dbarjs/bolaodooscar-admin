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
import VueRouter from "vue-router";
import { rtdbPlugin } from "vuefire";
import App from "./components/App.vue";
import store from "./store";

Vue.use(rtdbPlugin);
Vue.use(VueRouter);

const Foo = { template: "<div>Foo</div>" };
const Bar = { template: "<div>Bar</div>" };

const routes = [
  { path: "/foo", component: Foo },
  { path: "/bar", component: Bar },
];

const router = new VueRouter({
  routes,
});

new Vue({
  el: app.element,
  store,
  router,
  render: h => h(App),
});
