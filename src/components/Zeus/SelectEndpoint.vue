<template>
  <div class="relative">
    <div
      class="group border border-slate-800 bg-slate-900 h-12 w-96 flex flex-row items-center px-4 justify-between rounded-md hover:bg-slate-800 transition-all duration-700"
      @click="toggle"
    >
      <span
        v-if="endpointIndex < 0"
        class="tracking-wider text-blue-400 uppercase group-hover:text-slate-400 transition-all duration-700 cursor-pointer"
      >
        Select Endpoint
      </span>
      <div v-else class="flex flex-row">
        <span
          class="font-bold tracking-wider text-blue-400 uppercase group-hover:text-slate-400 transition-all duration-700 cursor-pointer mr-4"
        >
          {{ notebook.endpoints[endpointIndex].verb }}
        </span>
        <span
          class="tracking-wider text-slate-400 uppercase group-hover:text-slate-400 transition-all duration-700 cursor-pointer"
        >
          /{{ notebook.endpoints[endpointIndex].name }}
        </span>
      </div>
      <chevron-up-icon
        v-if="isOpen"
        class="h-8 w-8 text-blue-400 group-hover:text-slate-400 transition-all duration-700"
      />
      <chevron-down-icon
        v-else
        class="h-8 w-8 text-blue-400 group-hover:text-slate-400 transition-all duration-700"
      />
    </div>
    <div
      v-if="isOpen"
      class="absolute z-50 h-96 w-96 border border-slate-600 shadow-lg top-12 left-0 bg-slate-900 transition duration-700"
    >
      <endpoint-row
        v-for="(ep, k) in notebook.endpoints"
        :endpoint="ep"
        @click="selected(k)"
      />
    </div>
  </div>
</template>

<script>
// import Component from "@/components/Component.vue"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/solid";
import EndpointRow from "./EndpointRow.vue";

export default {
  components: { ChevronDownIcon, ChevronUpIcon, EndpointRow },

  props: {
    notebook: { type: Object, default: () => {} },
  },

  emits: [],

  watch: {},

  data() {
    return {
      isOpen: false,
      selectedEndpoint: null,
    };
  },

  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    selected(k) {
      console.log("Selected the " + k + "endpoint.");
      this.$store.commit("notebooks/setEndpoint", k);
      this.isOpen = false;
    },
  },

  computed: {
    endpointIndex() {
      return this.$store.state.notebooks.endpointIndex;
    },
  },

  created() {},

  mounted() {},
};
</script>

<style></style>
