import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../components/axios-client";

const StateContext = createContext({
    user: null,
    token: null,
    isPending: true,
    setUser: () => {},
    setToken: () => {},
    setIsPending: () => {}
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [isPending, setIsPending] = useState(true);

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    useEffect(() => {
        if (token) {
            axiosClient.get('/user')
                .then(response => {
                    setUser(response.data);
                    setIsPending(false);
                })
                .catch(error => {
                    setIsPending(false);
                });
        } else {
            setIsPending(false);
        }
    }, [token]);

    return (
        <StateContext.Provider value={{
            user,
            token,
            isPending,
            setUser,
            setToken,
            setIsPending
        }}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);