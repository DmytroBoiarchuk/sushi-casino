import axios from "axios";
import { ItemsProps } from "../App.tsx";

const BASE_URL = import.meta.env.VITE_APP_MAIN_API;

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

export const getItemsSet = async (code: string): Promise<ItemsProps[]> => {
  return new Promise((resolve, reject) => {
    apiClient
      .get("/casino")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
