import { useState, useEffect} from 'react';
import axiosClient from "../components/axios-client";
import queryString from "query-string";
const useFetch = (filter) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const payload = {
        category: filter
    };
    const queryStr = queryString.stringify(payload);

    useEffect(() => {
        setData(null);
        setIsPending(true);
        axiosClient.get(`/posts?${queryStr}`)
            .then(response => {
                setData(response.data);
                setIsPending(false);
            })
            .catch(error => {
                setError(error.message);
                setIsPending(false);
            })
    }, [queryStr]);

    return { data, isPending, error };
}

export default useFetch;
