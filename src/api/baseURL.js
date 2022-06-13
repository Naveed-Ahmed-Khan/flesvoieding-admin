import axios from "axios";

const API = axios.create({ baseURL: "https://karwan-api.herokuapp.com" });

export default API;
