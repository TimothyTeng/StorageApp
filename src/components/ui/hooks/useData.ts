import { useState } from "react";
import axios from "axios";

export function useAxios() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const get = async(url:string, config = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  const post = async(url:string, data={}, config={}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(url,data, config);
      return response.data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { get, post, loading, error };
}
