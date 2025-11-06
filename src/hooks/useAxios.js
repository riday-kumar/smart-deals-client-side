import axios from "axios";

const instance = axios.create({
  baseURL: "https://smart-deals-api-server-two.vercel.app/",
});

const useAxios = () => {
  return instance;
};

export default useAxios;
