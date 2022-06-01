<template>
  <div
    class="bg-slate-800 group flex flex-row items-center px-4 py-2 hover:bg-sky-800 transition-all duration-700 cursor-pointer"
  >
    <span
      class="text-blue-500 font-bold uppercase mr-4 group-hover:text-slate-200 transition-all duration-700"
    >
      {{ endpoint.verb }}
    </span>
    <span
      class="text-blue-400 uppercase tracking-widest group-hover:text-slate-200 transition-all duration-700"
    >
      /{{ endpoint.name }}
    </span>
  </div>
</template>

<script>
// import Component from "@/components/Component.vue"

export default {
  components: {},

  props: { endpoint: { type: Object, default: () => {} } },

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
