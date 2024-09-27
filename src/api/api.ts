import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.API_URL
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.log(token, " achei nao")
    }
    return config;
  },
  (error) => {
    // Faça algo com erros de requisição
    return Promise.reject(error);
  }
);

export default api