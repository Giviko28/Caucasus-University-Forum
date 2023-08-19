import {useEffect, useState} from "react";
import axiosClient from "../components/axios-client";

export const getCategories = (setSchools) => {
    axiosClient.get('/categories')
        .then(response => {
            setSchools(response.data);
        })
        .catch(error => {
            throw error;
        })
}
