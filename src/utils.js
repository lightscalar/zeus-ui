import axios from "axios";
// const BASE_URL = "http://localhost:8000";
const BASE_URL = import.meta.env.VITE_SERVER_URL;

var callServer = async function (verb, endpoint, payload) {
  let uri = BASE_URL + "/" + endpoint;

  if (verb == "get") {
    let resp = await axios.get(uri);
    return resp;
  }

  if (verb == "post") {
    let resp = await axios.post(uri, payload);
    return resp;
  }

  if (verb == "upload") {
    let headers = { "Content-Type": "multipart/form-data" };
    let resp = await axios.post(uri, payload, headers);
    return resp;
  }

  if (verb == "put") {
    let resp = await axios.put(uri, payload);
    return resp;
  }

  if (verb == "delete") {
    // In this case the payload is the resource ID...
    uri = BASE_URL + "/" + endpoint + "/" + payload;
    let resp = await axios.delete(uri, payload);
    return resp;
  }

  // ... and more verbs to come down here
};

export { callServer };
