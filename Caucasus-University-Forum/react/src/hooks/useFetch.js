import { useState, useEffect} from 'react';
import axiosClient from "../components/axios-client";
import queryString from "query-string";

const useFetch = (url, filter) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    if (filter) {
        url = url + `?${queryString.stringify(filter)}`;
        console.log(url);
    }

    useEffect(() => {
        if (filter) {setData(null); setIsPending(true)}
            axiosClient.get(url)
            .then(response => {
                setData(response.data);
                setIsPending(false);
            })
            .catch(error => {
                setError(error.message);
                setIsPending(false);
            })
    }, [url]);

    return { data, isPending, error };
}

export default useFetch;
