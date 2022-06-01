<template>
  <div
    class="bg-gray-100 border border-gray-300 drop-shadow-sm rounded-md w-1/2 flex flex-row items-start items-center"
  >
    <div
      class="w=1/6 p-4 h-12 bg-purple-700 text-white font-semibold rounded-l-md flex items-center"
      :class="fileTypeClass"
    >
      JSON
    </div>

    <div class="ml-6">sample_input.json</div>
  </div>
</template>

<script>
// import Component from "@/components/Component.vue"

export default {
  components: {},

  props: {
    mode: { type: String, default: "left" },
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  emits: [],

  watch: {},

  data() {
    return {};
  },

  methods: {},

  computed: {
    fileTypeClass() {
      if (this.pair.file) {
      }
    },
  },

  created() {},

  mounted() {},
};
</script>

<style></style>
