<template>
  <router-link
      class='w-1/2'
    :to="{ name: 'NotebookOverview', params: { notebookId: notebook._id } }"
  >
    <div
      class="group h-24 mt-4 rounded-md w-full bg-slate-900 border-2 border-sky-400 h-96 flex flex-row items-center hover:bg-sky-800 transition-all duration-700"
    >
      <div class="flex flex-row justify-between items-center w-full">
        <span
          class="text-blue-500 text-xl tracking-widest p-2 rounded-md px-4 group-hover:text-white transition-all duration-700"
        >
          {{ notebook.filename }}
        </span>
        <span class="p-2 rounded-lg">
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
    </div>
  </router-link>
</template>

<script>
// import Component from "@/components/Component.vue"
import { StatusOnlineIcon, StatusOfflineIcon } from "@heroicons/vue/solid";

export default {
  components: {
    StatusOnlineIcon,
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

  methods: {},

  computed: {},

  created() {},

  mounted() {},
};
</script>

<style></style>
