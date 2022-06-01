<template>
  <div class="p-2 pt-4 w-full px-0">
    <prism-editor
      class="code-editor w-full p-6 rounded-md border-2 border-slate-700"
      v-model="code"
      :highlight="highlighter"
      readonly
    ></prism-editor>
  </div>
</template>

<script>
// import Component from "@/components/Component.vue"
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";
import Prism from "prismjs";
// import 'prismjs/themes/prism.css'
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-shell-session";
import "prismjs/components/prism-solidity";
import "prismjs/themes/prism-tomorrow.min.css";

export default {
  components: { PrismEditor },

  props: {
    code: { type: String, default: "console.log('Hello World')" },
    lang: { type: String, default: "py" },
  },

  emits: [],

  watch: {},

  data() {
    return {};
  },

  methods: {
    highlighter(code) {
      return highlight(code, languages[this.lang]);
    },
  },

  computed: {},

  created() {},

  mounted() {},
};
</script>

<style scoped>
.code-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  /* background: #334155; */
  background: #1e293b;
  @apply bg-slate-900;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 16px;
  line-height: 1.5;
  max-height: 79vh;
}
</style>

