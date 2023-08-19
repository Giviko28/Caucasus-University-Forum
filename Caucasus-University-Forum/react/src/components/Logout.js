import {useStateContext} from "../contexts/StateContext";
import {Redirect} from "react-router-dom";
import axiosClient from "./axios-client";


export const Logout = () => {
    const {setUser, setToken, token} = useStateContext();
    if (!token) {
        return <Redirect to='/authorization' />
    } else {
        axiosClient.get('/logout')
            .then(response => {
                setUser(null);
                setToken(localStorage.getItem("ACCESS_TOKEN"));
            })
            .catch(error => {
                console.log(error);
            })
    }
}
