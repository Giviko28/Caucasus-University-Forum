import {useStateContext} from "../contexts/StateContext";
import {Redirect} from "react-router-dom";
import axiosClient from "./axios-client";


export const Logout = () => {
    const {setUser, token} = useStateContext();
    if (!token) {
        return <Redirect to='/authorization' />
    } else {
        axiosClient.get('/logout')
            .then(response => {
                localStorage.removeItem('ACCESS_TOKEN');
                setUser(null);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
}
