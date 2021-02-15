import axios from "axios";
import { apiUrl } from "../configs";

const configureAxios = axios.create({
  withCredentials: true,
  baseURL: apiUrl,
});

export default configureAxios;
