import React, { useRef } from "react";
import axios from "axios";
import { Feature, GeoResponse } from "../models/responses/geo_response";
import { env } from "../lib";

const useFetchAddress = (options: string) => {
  const [data, setData] = React.useState<Feature[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const abortController = useRef<AbortController | null>(null);

  const fetchData = React.useCallback(async () => {
    abortController.current = new AbortController();

    setError(null);
    setLoading(true);

    try {
      if (options.length === 0) {
        setData([]);
        return;
      }
      const response = await axios.get<GeoResponse>(
        "https://api.geoapify.com/v1/geocode/autocomplete",
        {
          params: {
            text: options,
            apiKey: env.VITE_API_KEY_GOOGLE_MAPS,
          },
          headers: { "Content-Type": "application/json" },
          signal: abortController.current?.signal,
        }
      );

      const data = response.data;
      if (data.features) {
        setData(data.features);
      }
    } catch (error) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  }, [options]);

  React.useEffect(() => {
    fetchData();

    return () => {
      abortController.current?.abort();
    };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetchAddress;
