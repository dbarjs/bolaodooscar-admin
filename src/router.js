import VueRouter from "vue-router";
import Movies from "./pages/movies.vue";
import Categories from "./pages/categories.vue";
import Nominees from "./pages/nominees.vue";
import Winners from "./pages/winners.vue";
import Users from "./pages/users.vue";
import Votes from "./pages/votes.vue";

const routes = [
  { path: "/movies", component: Movies },
  { path: "/categories", component: Categories },
  { path: "/nominees", component: Nominees },
  { path: "/winners", component: Winners },
  { path: "/users", component: Users },
  { path: "/votes", component: Votes },
];

export default new VueRouter({
  routes,
});
