import { useState, useEffect } from 'react';
import '../css/index.css';
import Profile from './Profile';
import Navbar from  './Navbar';
import FilterList from  './FilterList';
import Timeline from './Timeline';
import {useStateContext} from "../contexts/StateContext";
import LoadingProfile from './loading-components/LoadingProfile';

const Home = () => {
    const {user, isPending} = useStateContext();
    const [filterSchool, setFilterSchool] = useState(null);
    const [searchQuery, setSearchQuery] = useState(null);
    useEffect(() => {
        document.body.className = 'home-body';
    }, []);

    const handleFilter = (school) => {
        setFilterSchool(school);
    }
    const handleSearch = (keyword) => {
        setSearchQuery(keyword);
    }

    return (
        <div className="main">
            {isPending && <LoadingProfile />}
            {!isPending && <Profile user={user} />}
            <Navbar handleSearch={handleSearch} handleFilter={handleFilter} />
            <FilterList handleFilter={handleFilter} />
            <Timeline searchQuery={searchQuery} filterSchool={filterSchool} />
        </div>
    );
}

export default Home;
