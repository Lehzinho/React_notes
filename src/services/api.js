import axios from "axios";

export const api = axios.create({
  baseURL: "https://react-notes-api.onrender.com",
});
