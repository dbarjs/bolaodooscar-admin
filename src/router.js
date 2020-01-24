import VueRouter from "vue-router";
import Movies from "./pages/movies.vue";
import Categories from "./pages/categories.vue";
import Nominees from "./pages/nominees.vue";

const routes = [
  { path: "/movies", component: Movies },
  { path: "/categories", component: Categories },
  { path: "/nominees", component: Nominees },
];

export default new VueRouter({
  routes,
});
