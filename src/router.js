import VueRouter from "vue-router";
import MovieList from "./components/MovieList.vue";
import CategoryList from "./components/CategoryList.vue";

const routes = [
  { path: "/movies", component: MovieList },
  { path: "/categories", component: CategoryList },
];

export default new VueRouter({
  routes,
});
