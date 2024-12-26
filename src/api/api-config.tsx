import axios from "axios";

const instance = axios.create({
  baseURL: "https://baohiem.dion.vn/",
});
export default instance;
