import { firestoreAction } from "vuexfire";

const state = {
  categories: [],
};

const getters = {
  getCategoryList: state => state.categories,
};

const actions = {
  bindCategoriesRef: firestoreAction((context, collectionRef) => {
    context.bindFirestoreRef(
      "categories",
      collectionRef.orderBy("order", "asc")
    );
  }),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
};
