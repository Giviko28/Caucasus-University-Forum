import { useState, useEffect } from 'react';
import '../css/index.css';
import Profile from './Profile';
import Navbar from  './Navbar';
import FilterList from  './FilterList';
import Timeline from './Timeline';
import axiosClient from "./axios-client";
import {useStateContext} from "../contexts/StateContext";

const Home = () => {
    const [filterSchool, setFilterSchool] = useState(null);
    const {token, setUser} = useStateContext();
    useEffect(() => {
        document.body.className = 'home-body';

        if(token){
            axiosClient.get('/user')
                .then(response => {
                    setUser(response.data);
                })
        }
    }, []);

    const handleFilter = (school) => {
        setFilterSchool(school);
    }

    return (
        <div className="main">
            <Profile />
            <Navbar handleFilter={handleFilter} />
            <FilterList handleFilter={handleFilter} />
            <Timeline filterSchool={filterSchool} />
        </div>
    );
}

export default Home;
