<template>
  <div
    class="w-2/3 bg-slate-700 min-h-fit p-8 rounded-md ml-12"
    v-if="notebook._id"
  >
    <select-endpoint :notebook="notebook" />
    <div v-if="endpointIndex < 0">
      <span
        class="mt-12 p-8 text-4xl text-slate-400 flex flex-row justify-around w-full"
      >
        Select an Endpoint to See Documentation
      </span>
    </div>

    <endpoint-summary v-else />
  </div>
</template>

<script>
// import Component from "@/components/Component.vue"
import SelectEndpoint from "./SelectEndpoint.vue";
import EndpointSummary from "./EndpointSummary.vue";

export default {
  components: { SelectEndpoint, EndpointSummary },

  props: {},

  emits: [],

  watch: {},

  data() {
    return {};
  },

  methods: {},

  computed: {
    notebook() {
      return this.$store.state.notebooks.notebook;
    },
    endpointIndex() {
      return this.$store.state.notebooks.endpointIndex;
    },
  },

  created() {},

  mounted() {},
};
</script>

<style></style>
