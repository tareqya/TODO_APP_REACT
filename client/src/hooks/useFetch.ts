import React from "react";
import { ApiRequest } from "../utils/ApiRequest";

const useFetch = (url: string, params = {}) => {
  const [requestParams, setRequestParams] = React.useState(params);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<any>(undefined);

  const fetchData = async () => {
    try {
      const response = await ApiRequest(url, requestParams, "GET");
      setData(response.data);
    } catch (err: any) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setLoading(true);
    fetchData();
  }, [url, requestParams]);

  return [data, loading, error, setRequestParams];
};

export default useFetch;
