<template>
  <div class='flex flex-col'>
  <div class="flex flex-row mt-12 px-12 min-h-96" v-if='notebook._id'>
    <notebook-summary :notebook="notebook" />
    <notebook-documentation :notebook="notebook"/>
  </div>
  </div>
</template>

<script>
// import Component from "@/components/Component.vue"
import NotebookSummary from "./NotebookSummary.vue";
import NotebookDocumentation from "./NotebookDocumentation.vue";

export default {
  components: { NotebookSummary, NotebookDocumentation },

  props: {
    notebookId: { type: String, default: "" },
  },

  emits: [],

  watch: {},

  data() {
    return {};
  },

  methods: {},

  computed: {
    notebook() {
      return this.$store.state.notebooks.notebook
    }
  },

  created() {},

  mounted() {
    this.$store.dispatch("notebooks/getNotebook", this.notebookId);
  },
};
</script>

<style></style>
