<template>
  <div class="">
    <line-summary
      v-if="notebook.is_deployed"
      fieldname="Endpoint Location"
      :value="url"
    />
    <line-summary
      v-else
      fieldname="Endpoint Location"
      value="NOT DEPLOYED"
    />
    <line-summary
      v-for="(data, k) in required_data"
      fieldname="Required Data"
      :value="neededData(data)"
    />
  </div>
  <div class="mt-4 bg-slate-800 px-4 rounded-md py-2">
    <span class="text-blue-400 font-bold uppercase mt-4"> Example Usage </span>
    <code-block :code="pythonExample" lang="py" />
    <code-block :code="shellExample" lang="sh-session" />
  </div>
</template>

<script>
// import Component from "@/components/Component.vue"
import LineSummary from "./LineSummary.vue";
import CodeBlock from "./CodeBlock.vue";

export default {
  components: { LineSummary, CodeBlock },

  props: {},

  emits: [],

  watch: {},

  data() {
    return {};
  },

  methods: {
    neededData(data) {
      return data.name + " | text/" + data.file_type;
    },
  },

  computed: {
    pythonExample() {
      let idx = this.endpointIndex;
      let nb = this.notebook;
      let ep = nb.endpoints[idx];
      let required_data = this.required_data;
      let url = this.url;
      let code;
      let files;
      if (ep.verb == "get") {
        code = "# Python Example\n";
        code += "import requests\n";
        code += "\n# Simply make a get request to the endpoint\n";
        code += "result = requests.get('" + url + "')";
      } else if (ep.verb == "post") {
        // It is a post request, so...
        code = "# Python Example\n";
        code += "import requests\n";
        // code += "\n# Post the required files to the endpoint \n";
        files = "files=[";
        for (let k = 0; k < required_data.length; k++) {
          let data = required_data[k];
          files +=
            "('" +
            data.name +
            "', " +
            "open('filename_" +
            k +
            "." +
            data.file_type +
            "', 'rb')";
          ("),");
        }
        files += ")]";

        code += "result = requests.post('" + url + "'" + ", " + files + ")";
      }
      return code;
    },

    shellExample() {
      let nb = this.notebook;
      let ep = nb.endpoints[this.endpointIndex];
      let required_data = this.required_data;
      let url = this.url;
      let code;
      if (ep.verb == "get") {
        code = "# Curl Example\n";
        code += "curl " + url;
      } else {
        code = "# Curl Example\n";

        code += "curl ";
        for (let k = 0; k < required_data.length; k++) {
          let data = required_data[k];
          code +=
            "-F " +
            data.name +
            '="@filename_' +
            k +
            "." +
            data.file_type +
            '" ';
        }
        code += url;
      }
      return code;
    },

    notebook() {
      return this.$store.state.notebooks.notebook;
    },

    endpointIndex() {
      return this.$store.state.notebooks.endpointIndex;
    },

    url() {
      let base = "http://127.0.0.1";
      let port = this.notebook.port_number;
      if (port < 0) {
        port = 'PORT'
      }
      let endpointName = this.notebook.endpoints[this.endpointIndex].name;
      let url = base + ":" + port + "/" + endpointName;
      return url;
    },

    required_data() {
      return this.notebook.endpoint_data[this.endpointIndex];
    },
  },

  created() {},

  mounted() {},
};
</script>

<style></style>
