import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const axiosSecureInstance = axios.create({
  baseURL: "https://smart-deals-api-server-two.vercel.app/",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // request interceptor
    const requestInterceptor = axiosSecureInstance.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      }
    );

    // response interceptor
    const responseInterceptor = axiosSecureInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const status = err.status;
        if (status === 401 || status === 403) {
          logOut().then(() => {
            navigate("/register");
          });
        }
      }
    );

    return () => {
      axiosSecureInstance.interceptors.request.eject(requestInterceptor);
      axiosSecureInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);
  return axiosSecureInstance;
};

export default useAxiosSecure;
