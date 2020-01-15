import { firestoreAction } from "vuexfire";
import { categoriesRef } from "../../firebase";

const state = {
  categories: [],
};

const getters = {
  getCategoryList: state => state.categories,
};

const actions = {
  bindCategoriesRef: firestoreAction(context => {
    context.bindFirestoreRef(
      "categories",
      categoriesRef.orderBy("order", "asc")
    );
  }),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
};
