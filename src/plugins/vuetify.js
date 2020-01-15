import Vue from "vue";
import Vuetify from "vuetify/lib";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const options = {
  theme: {
    themes: {
      light: {},
    },
  },
};

export default new Vuetify(options);
