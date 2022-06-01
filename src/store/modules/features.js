import { callServer } from "../../utils.js";
import { useToast } from "vue-toastification";
import router from "@/router/index";

const toast = useToast();

const state = {
  currentFeature: {},
  featureLoaded: false,
  features: [],
  problems: [],
};

const getters = {};

const mutations = {
  setProblems(state, problems) {
    state.problems = problems;
  },

  setCurrentFeature(state, feature) {
    console.log(feature);
    state.currentFeature = feature;
  },

  setFeatures(state, features) {
    state.features = features;
  },
};

const actions = {
  async createProblem(context, problem) {
    try {
      let url = "problems/";
      let resp = await callServer("post", url, problem);
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  },

  async getProblems(context) {
    try {
      let url = "problems/";
      let resp = await callServer("get", url);
      context.commit("setProblems", resp.data);
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  },

  async updateFeature(context, feature) {
    try {
      let url = "features/" + feature._id;
      let resp = await callServer("put", url, feature);
      context.dispatch("contracts/listContracts", null, { root: true });
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  },

  async updateScenario(context, scenario) {
    try {
      let url = "scenarios/" + scenario._id;
      let resp = await callServer("put", url, scenario);
      context.dispatch("contracts/listContracts", null, { root: true });
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  },

  async createScenario(context, featureId) {
    try {
      let url = "features/" + featureId + "/scenarios";
      let resp = await callServer("post", url);
      context.dispatch("contracts/listContracts", null, { root: true });
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  },

  async createFeature(context, contractId) {
    try {
      let url = "contracts/" + contractId + "/features";
      let resp = await callServer("post", url);
      context.dispatch("contracts/listContracts", null, { root: true });
      context.commit("setCurrentFeature", resp.data);
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  },

  async getFeatures(context, contractId) {
    try {
      let url = "contracts/" + contractId + "/features";
      let resp = await callServer("get", url);
      context.commit("setFeatures", resp.data);
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
