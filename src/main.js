import Vue from "vue";

import App from "./App.vue";
import store from "./store";
import router from "./router";

import "./assets/main.css";

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
