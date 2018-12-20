import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import Buefy from "buefy";
import "buefy/dist/buefy.css";

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
 /*  components: {
    editCtTypes: () =>
      import("../src/components/editDatabases/EditDatabasesContentTypes.vue")
  }, */
  render: h => h(App)
}).$mount("#app");
