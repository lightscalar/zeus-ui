<template>
  <div class="">
    <div class="bg-slate-900 h-20 w-full flex flex-row items-center">
      <router-link to="/">
        <img src="./assets/lightning.png" class="h-20" />
      </router-link>
      <router-link :to="{ name: 'NotebookList' }">
        <span
          class="p-1 px-2 text-blue-400 text-lg tracking-wider uppercase ml-12 cursor-pointer hover:bg-sky-800 transition-all duration-700 rounded-md hover:text-blue-200"
        >
          Notebooks
        </span>
      </router-link>
      <span
        class="p-1 px-2 text-blue-400 text-lg tracking-wider uppercase ml-12 cursor-pointer hover:bg-sky-800 transition-all duration-500 rounded-md hover:text-blue-200"
      >
        Documentation
      </span>
      <span
        class="p-1 px-2 text-blue-400 text-lg tracking-wider uppercase ml-12 cursor-pointer hover:bg-sky-800 transition-all duration-500 rounded-md hover:text-blue-200"
      >
        About
      </span>
    </div>
    <router-view />
  </div>
</template>

<script>
// import Component from "@/components/Component.vue"
// import LandingPage from "./components/LandingPage.vue";
import { callServer } from "./utils.js";

export default {
  components: {},

  props: {},

  emits: [],

  watch: {},

  data() {
    return {};
  },

  methods: {},

  computed: {},

  created() {},

  mounted() {
    this.$store.commit("microservices/setCurrentStep", "Details");
    console.log(import.meta.env.VITE_SERVER_URL);
  },
};
</script>

<style>
html,
body {
  @apply bg-slate-600;
}
</style>
