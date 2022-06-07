<template>
  <div class="flex flex-col justify-around items-center">
    <div class="w-1/2 mt-6 flex flex-row justify-between p-0">
      <input
        class="p-4 text-gray-100 mr-6 bg-gray-900 rounded-md w-3/4 border-2 border-gray-900 outline-none focus:border-sky-400"
        placeholder="Search notebooks"
        v-model="searchTerm"
      />

      <router-link to="/">
        <button
          class="text-blue-400 border border-blue-400 bg-slate-800 w-72 p-4 pt-2 hover:bg-sky-700 hover:text-slate-200 transition-all duration-700 rounded-md"
        >
          <div class="flex flex-row items-center mt-2">
            <plus-circle-icon class="h-8 w-8 mr-2" />
            <span class="tracking-widest"> Add Notebook </span>
          </div>
        </button>
      </router-link>
    </div>
    <div v-if='notebooks.length>0' class='w-1/2'>
  <notebook-card v-for='nb in notebooks' :notebook='nb'/>
    </div>
    <span v-else class='text-slate-900 font-bold text-4xl mt-8'>
      No notebooks available.
    </span>
  </div>

</template>

<script>
// import Component from "@/components/Component.vue"
import { PlusCircleIcon } from "@heroicons/vue/solid";
import NotebookCard from "./NotebookCard.vue"

export default {
  components: { PlusCircleIcon, NotebookCard },

  props: {},

  emits: [],

  watch: {},

  data() {
    return {
      searchTerm: ''
    };
  },

  methods: {},

  computed: {
    notebooks() {
      return this.$store.state.notebooks.notebooks;
    },
  },

  created() {},

  mounted() {
    this.$store.dispatch("notebooks/listNotebooks");
  },
};
</script>

<style></style>
