import { useState, useEffect} from 'react';
import axiosClient from "../components/axios-client";

const useFetch = () => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosClient.get('/posts')
            .then(response => {
                setData(response.data);
                setIsPending(false);
            })
            .catch(error => {
                setError(error.message);
                setIsPending(false);
            })
    }, []);

    return { data, isPending, error };
}

export default useFetch;
