import { useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import axios from "axios";

const useApi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const instance = useMemo(() => axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
  }), []);

  
  const request = useCallback(async (method, url, data, config) => {
    try {
      setLoading(true);
      setError(null);
      const response = await instance[method](url, data, config);
      return response;
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || "Something went wrong";

      if (status === 401) {
        dispatch(logout());
        navigate("/login");
      }
      if (status === 403) {
        navigate("/unauthorised");
      }

      setError(message);
      throw err; 
    } finally {
      setLoading(false);
    }
  }, [instance, dispatch, navigate]);


  const api = useMemo(() => ({
    get:    (url, config)        => request("get", url, undefined, config),
    post:   (url, data, config)  => request("post", url, data, config),
    put:    (url, data, config)  => request("put", url, data, config),
    patch:  (url, data, config)  => request("patch", url, data, config),
    delete: (url, config)        => request("delete", url, undefined, config),
  }), [request]);

  const clearError = useCallback(() => setError(null), []);

  return { api, loading, error, clearError };
};

export default useApi;