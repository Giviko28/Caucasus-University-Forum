import { useState, useEffect} from 'react';
import axiosClient from "../components/axios-client";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
