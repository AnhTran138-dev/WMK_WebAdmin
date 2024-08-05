import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { axiosInstance } from "../configs";

interface FetchOptions {
  params?: Record<string, unknown>;
}

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

const useFetch = <T>(url: string, options?: FetchOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const abortController = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    abortController.current = new AbortController();

    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.get<ApiResponse<T>>(url, {
        ...options,
        signal: abortController.current?.signal,
      });
      setData(response.data.data); // Truy cập dữ liệu từ thuộc tính `data`
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();

    return () => {
      abortController.current?.abort();
    };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
