import API from "../api/baseURL";
import { useEffect, useState } from "react";

const useFetch = (endPoint, check) => {
  const [isloading, setIsloading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async (endPoint) => {
      setIsloading(true);
      try {
        const res = await API.get(endPoint);
        // console.log(res.data);
        setData(res.data);
        if (res.status === 200) {
          setIsloading(false);
        }
      } catch (err) {
        console.log(err);
        setErrorMessage(err.message);
      }
    };

    fetchData(endPoint);
  }, [check]);

  console.log(data);

  return { data, isloading, errorMessage };
};

export default useFetch;
