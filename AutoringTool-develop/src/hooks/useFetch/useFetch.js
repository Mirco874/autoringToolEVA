import { useEffect, useState } from "react";

export const useFetch = (url = "") => {
  const [content, setContent] = useState({
    data: {},
    isLoading: true,
    hasError: false,
  });

  const fetchData = async () => {
    if(url===""){
      setContent({ data: {}, isLoading: false, hasError: false });
      return
    }
    setContent({ ...content, isLoading: true, hasError: false });
    const res = await fetch(url);
    const resData = await res.json();
    setContent({ data: resData, isLoading: false, hasError: false });

  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { content };
};
