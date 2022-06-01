import { useToast } from "vue-toastification";
import router from "@/router/index";
import { callServer } from "../../utils.js";

const toast = useToast();

const state = {
  notebooks: [],
  notebook: {},
  endpointIndex: -1
};

const getters = {};

const mutations = {
  setCurrentNotebook(state, notebook) {
    state.notebook = notebook;
  },

  setEndpoint(state, endpointIndex) {
    state.endpointIndex = endpointIndex
  }
};

const actions = {
  async create(context, file) {
    try {
      var formData = new FormData();
      formData.append("notebook", file);
      let url = "notebooks";
      let resp = await callServer("upload", url, formData);
      let notebook = resp.data;
      context.commit("setCurrentNotebook", notebook);
      router.push({
        name: "NotebookOverview",
        params: { notebookId: notebook._id },
      });
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  },

  async getNotebook(context, notebookId) {
    try {
    let endpoint = "notebooks/" + notebookId;
    let resp = await callServer("get", endpoint);
    context.commit("setCurrentNotebook", resp.data);
    } catch(err) {
      console.log(err.message)
      toast.error(err.message)
    }

  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
