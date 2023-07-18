import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = <T>(url: string) => {
  const [response, setResponse] = useState<T | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((resp) => {
        setIsLoading(false);
        setIsError(false);
        setResponse(resp.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        setResponse(null);
      });
    return () => {};
  }, [url]);

  return { response, isLoading, isError };
};

export default useFetch;
