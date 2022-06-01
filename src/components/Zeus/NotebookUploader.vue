<template>
  <div @dragover.prevent @drop.prevent>
    <input
      name="contract"
      type="file"
      @change="fileSelected"
      ref="file"
      class="hidden"
    />
    <div
      @click="openFiles"
      @drop="fileDropped"
      class="min-h-30 flex flex-row justify-around p-4 py-24 text-slate-200 text-purple-400 bg-slate-800 border-4 border-blue-400 rounded-md cursor-pointer hover:bg-sky-800 hover:border-sky-700 group transition-all duration-700 md:text-xl lg:text-2xl"
    >
      <div
        class="flex flex-row text-blue-400 group-hover:text-blue-200 transition-all duration-700 uppercase tracking-widest"
      >
        <lightning-bolt-icon class="-mt-2 mr-4 w-12 h-12 text-blue-600 animate-pulse group-hover:text-blue-400 upper" />
        Drag notebook here &bull; Click to browse
      </div>
    </div>
  </div>
</template>

<script>
// import Component from "@/components/Component.vue"
import { DocumentAddIcon } from "@heroicons/vue/solid";
import { LightningBoltIcon } from "@heroicons/vue/solid";

export default {
  components: { DocumentAddIcon, LightningBoltIcon },

  props: {},

  emits: [],

  watch: {},

  data() {
    return {
      file: null,
    };
  },

  methods: {
    fileDropped(e) {
      this.file = e.dataTransfer.files[0];
      this.uploadFile();
    },

    fileSelected(e) {
      this.file = e.target.files[0];
      this.uploadFile();
    },

    uploadFile() {
      console.log("Uploading the file!");
      this.$store.dispatch("notebooks/create", this.file);
    },

    openFiles() {
      this.$refs.file.click();
    },
  },

  computed: {
    contract() {
      return this.$store.state.contracts.contract;
    },
  },

  created() {},

  mounted() {},
};
</script>

<style></style>
