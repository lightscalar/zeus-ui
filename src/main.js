import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import store from "./store";
import router from "./router";
import VueHighlightJS from "vue3-highlightjs";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "highlight.js/styles/solarized-dark.css";
import "./assets/styles/tooltips.css";
import VTooltip from "v-tooltip";

const toastOptions = { hideProgressBar: true, timeout: 2000 };
const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueHighlightJS);
app.use(Toast, toastOptions);
app.use(VTooltip);
app.mount("#app");

// Just put this everywhere.
import { useToast } from "vue-toastification";
window.toast = useToast();
