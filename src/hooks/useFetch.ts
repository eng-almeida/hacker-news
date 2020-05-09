import { useEffect, useState } from "react";

const useFetch = <T>(url: string, options?: RequestInit) => {
  const [json, setJSON] = useState<T | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetch(url, options);
        setJSON(await result.json());
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [options, url]);
  return { json, error, loading };
};

export default useFetch;
