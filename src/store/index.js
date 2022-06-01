import { createStore, createLogger } from "vuex";
import microservices from "./modules/microservices";
import contracts from "./modules/contracts";
import features from "./modules/features";
import notebooks from "./modules/notebooks";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    microservices,
    contracts,
    features,
    notebooks,
  },
  strict: false,
  plugins: debug ? [createLogger()] : [],
});
