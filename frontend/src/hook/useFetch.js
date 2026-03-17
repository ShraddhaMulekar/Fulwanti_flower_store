import { useState } from "react";
import { fetchAPI } from "../api/api";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (url, method = "GET", body = null) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAPI(url, {
        method,
        body: body ? JSON.stringify(body) : null,
      });
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, request };
};

export default useFetch;