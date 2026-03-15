import React, { useState } from "react";
import { fetchAPI } from "../api/api";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (url, method = "GET", body = null) => {
    try {
      const data = await fetchAPI(url, {
        method,
        body: body ? JSON.stringify(body) : null,
      });
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return { loading, error, request };
};

export default useFetch;