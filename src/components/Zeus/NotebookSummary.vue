<template>
  <div class="w-1/3 bg-slate-700 flex-col min-h-full p-8 rounded-md">
    <div class="flex flex-row justify-between items-center">
      <span
        class="text-blue-500 text-xl font-bold tracking-widest bg-slate-900 p-2 rounded-md px-4"
      >
        {{ notebook.filename }}
      </span>
      <span class="p-2 bg-slate-900 rounded-lg">
        <status-online-icon
          v-if="notebook.is_deployed"
          class="h-8 w-8 text-green-400"
          v-tooltip="'API Deployed'"
        />
        <status-offline-icon
          v-else
          class="h-8 w-8 text-red-400"
          v-tooltip="'API NOT Deployed'"
        />
      </span>
    </div>

    <line-summary
      v-if="notebook.is_deployed"
      fieldname="Base Location"
      :value="'http://127.0.0.1:' + notebook.port_number"
    />
    <line-summary
      v-else
      fieldname="Base Location"
      value="NOT DEPLOYED"
    />
    <line-summary fieldname="Python Version" :value="notebook.python_version" />
    <line-summary
      fieldname="Notebook Version"
      :value="notebook.notebook_version"
    />
    <line-summary
      fieldname="Number of Endpoints"
      :value="notebook.endpoint_names.length"
    />

    <textarea
      class="bg-slate-800 p-2 px-4 mt-4 w-full rounded-md text-slate-400"
      placeholder="Add a description of this notebook"
      noresize
    />

    <div class="flex flex-row-reverse mt-4 border-t border-slate-900">
      <button
        @click="toggleService"
        class="mt-4 text-blue-400 border border-blue-400 bg-slate-800 h-12 p-4 pt-2 hover:bg-sky-700 hover:text-slate-200 transition-all duration-700 rounded-md"
      >
        <div class="flex flex-row items-center">
          <stop-icon class="h-8 w-8 mr-2" />
          <span class="tracking-widest" v-if="notebook.is_deployed">
            Pause Service
          </span>
          <span class="tracking-widest" v-else> Launch Service </span>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
// import Component from "@/components/Component.vue"
import {
  StatusOnlineIcon,
  StatusOfflineIcon,
  DuplicateIcon,
  StopIcon,
} from "@heroicons/vue/solid";
import LineSummary from "./LineSummary.vue";

export default {
  components: {
    StatusOnlineIcon,
    DuplicateIcon,
    StopIcon,
    LineSummary,
    StatusOfflineIcon,
  },

  props: {
    notebook: { type: Object, default: () => {} },
  },

  emits: [],

  watch: {},

  data() {
    return {};
  },

  methods: {
    toggleService() {
      if (this.notebook.is_deployed) {
        this.$store.dispatch("notebooks/pause", this.notebook._id);
      } else {
        this.$store.dispatch("notebooks/launch", this.notebook._id);
      }
    },
  },

  computed: {},

  created() {},

  mounted() {},
};
</script>

<style>
.mono {
  font-family: "Roboto Mono", monospace;
}
textarea {
  resize: none;
}
</style>
