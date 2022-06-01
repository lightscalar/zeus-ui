import router from "@/router/index";
import { useToast } from "vue-toastification";
import { callServer } from "../../utils.js";

const toast = useToast();

let findEndpoint = function (state, id) {
  for (let k = 0; state.verbs.length; k++) {
    if (state.endpoints[k].id == id) {
      return k;
    }
  }
};

let findVerb = function (state, verbId) {
  for (let k = 0; k < state.verbs.length; k++) {
    if (state.verbs[k].id == verbId) {
      return state.verbs[k];
    }
  }
};

let findPair = function (state, id) {
  for (let k = 0; k < state.dataPairs.length; k++) {
    if (state.dataPairs[k].id == id) {
      return k;
    }
  }
};

const state = {
  name: "",

  currentEndpoint: "",

  assignOptions: [
    { id: "manual", title: "Manually" },
    { id: "from-source", title: "From existing data source" },
  ],

  description: "",

  verbs: ["GET", "DELETE", "OPTION", "PATCH", "POST", "PUT"],

  logic: [
    {
      endpointId: "0",
      logicTree: {
        node: { type: "root" },
      },
    },
  ],

  dataPairs: [],

  endpoints: [
    {
      id: "0",
      name: "version",
      verb: "GET",
      description: "Returns the current version of the microservice API.",
    },
  ],

  selectedEndpoint: {
    id: "0",
    name: "version",
    verb: "GET",
    description: "Returns the current version of the microservice API.",
  },

  services: [],

  currentService: { endpoints: [], _id: "" },

  steps: [
    {
      name: "Details",
      description: "Name and describe your service and choose your tech stack.",
      status: "current",
    },
    {
      name: "Endpoints",
      description: "Define the API endpoints associated with the microservice.",
      status: "upcoming",
    },
  ],
};

const getters = {};

const mutations = {
  setCurrentService(state, currentService) {
    state.currentService = currentService;
    state.currentEndpoint = currentService.endpoints[0];
    router.push({
      name: "Details",
      params: { serviceId: currentService._id },
    });
  },

  setServices(state, services) {
    state.services = services;
  },

  addOutputFile(state, { id, filename }) {
    let index = findPair(state, id);
    state.dataPairs[index].outputFilename = filename;
  },

  addInputFile(state, { id, filename }) {
    let index = findPair(state, id);
    state.dataPairs[index].inputFilename = filename;
  },

  addJson(state, pairId) {
    let index = findPair(state, pairId);
    state.dataPairs[index].outputFilename = "SAMPLE_OUTPUT.JSON";
  },

  addDataPair(state, endpointId) {
    let id = state.dataPairs.length;
    let pair = {
      id: id,
      endpointId: endpointId,
      inputFileType: "",
      inputFilename: "",
      outputFileType: "",
      outputFilename: "",
    };
    state.dataPairs.push(pair);
  },

  setEndpointName(state, { index, name }) {
    state.endpoints[index].name = name;
  },

  setEndpointDescription(state, { index, description }) {
    state.endpoints[index].description = description;
  },

  setEndpointVerb(state, { index, verb }) {
    state.endpoints[index].verb = verb;
  },

  addEndpoint(state, endpoint) {
    state.endpoints.push(endpoint);
  },

  setCurrentStep(state, stepName) {
    for (let k = 0; k < state.steps.length; k++) {
      if (state.steps[k].status != "complete") {
        state.steps[k].status = "upcoming";
      }
      if (state.steps[k].name == stepName) {
        state.steps[k].status = "current";
        state.currentStep = state.steps[k];
      }
    }
  },

  setName(state, microserviceName) {
    state.name = microserviceName;
  },

  setDescription(state, microserviceDescription) {
    state.description = microserviceDescription;
  },

  setEndpoint(state, endpointId) {
    for (let k = 0; k < state.endpoints.length; k++) {
      if (state.endpoints[k].id == endpointId) {
        state.selectedEndpoint = state.endpoints[k];
      }
    }
  },

  updateVerb(state, newId) {
    let endpointId = state.selectedEndpoint.id;
    for (let k = 0; state.verbs.length; k++) {
      if (state.verbs[k].id == newId) {
        state.selectedEndpoint.verb = state.verbs[k].name;
        state.selectedEndpoint.verbId = newId;
      }
    }
  },
};

const actions = {
  async createEndpoint(context, serviceId) {
    let resp = await callServer("post", "endpoints", serviceId);
    endpointId = resp.data._id;
    // Update the list of microservices (sideload the new endpoint).
    let microservices = await callServer("get", "microservices");
    context.commit("setServices", microservices.data);
    router.push({
      name: "Endpoints",
      serviceId: serviceId,
      endpointId: endpointId,
    });
  },

  async deleteService(context, { _id }) {
    let resp = await callServer("delete", "microservices", _id);
    toast.info("Service has been deleted.");
    context.dispatch("getServices");
    router.push({ name: "Dashboard" });
  },

  async saveService(context, service) {
    let resp = await callServer("put", "microservices", service);
    context.commit("setCurrentService", resp.data);
    toast.info("Service successfully updated!");
  },

  async getService(context, serviceId) {
    let endpoint = `microservices/${serviceId}`;
    let resp = await callServer("get", endpoint);
    context.commit("setCurrentService", resp.data);
  },

  async createMicroservice(context) {
    let resp = await callServer("post", "microservices");
    context.commit("setCurrentService", resp.data);
    toast.info("New microservice created!");
  },

  async getServices(context) {
    let resp = await callServer("get", "microservices");
    context.commit("setServices", resp.data);
  },

  // createEndpoint(context) {
  //   let endpoint = { verb: "GET", description: "" };
  //   context.commit("addEndpoint", endpoint);
  //   context.commit("setEndpoint", id);
  // },

  changeEndpointName(context, { id, name }) {
    let endpointIndex = findEndpoint(state, id);
    context.commit("setEndpointName", { index: endpointIndex, name: name });
  },

  changeEndpointDescription(context, { id, description }) {
    let endpointIndex = findEndpoint(state, id);
    context.commit("setEndpointDescription", {
      index: endpointIndex,
      description: description,
    });
  },

  changeEndpointVerb(context, { id, verbId }) {
    let verb = findVerb(state, verbId);
    let endpointIndex = findEndpoint(state, id);
    context.commit("setEndpointVerb", { index: endpointIndex, verb: verb });
  },

  createDataPair(context) {
    let endpointId = state.selectedEndpoint.id;
    context.commit("addDataPair", endpointId);
  },

  addJson(context, pairId) {
    context.commit("addJson", pairId);
  },

  addInputFile(context, details) {
    context.commit("addInputFile", details);
  },

  addOutputFile(context, details) {
    context.commit("addOutputFile", details);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
