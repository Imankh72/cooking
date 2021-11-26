import { useEffect, useState } from "react";

const useFetch = (url, method = "GET", id = "") => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const postData = (bodyData) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions) => {
      setIsPending(true);

      try {
        const res = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();

        setIsPending(false);
        setData(data);
        setError(null);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("The fetch was aborted");
        }
        setIsPending(false);
        setError("Could not fetch the data");
      }
    };

    if (method === "GET") fetchData();

    if (method === "POST" && options) fetchData(options);

    return () => controller.abort();
  }, [url, options, method, id]);

  return { data, isPending, error, postData };
};

export default useFetch;
