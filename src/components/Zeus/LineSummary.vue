<template>
  <div
    class="bg-slate-800 flex flex-row justify-between p-2 px-4 mt-4 rounded-md"
  >
    <span class="text-blue-300 text-sm tracking-widest mono uppercase">
      {{ fieldname }}
    </span>
    <span class="text-slate-300 text-sm tracking-wider mono">
      {{ value }}
    </span>
  </div>
</template>

<script>
// import Component from "@/components/Component.vue"

export default {
  components: {},

  props: {
    fieldname: { type: String, default: "" },
    value: { type: [String, Number], default: "" },
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

<style>
.mono {
  font-family: monospace;
}
</style>
