import { useState, useEffect } from 'react';
import '../css/index.css';
import Profile from './Profile';
import Navbar from  './Navbar';
import FilterList from  './FilterList';
import Timeline from './Timeline';

const Home = () => {
    const [filterSchool, setFilterSchool] = useState(null);
    useEffect(() => {
        document.body.className = 'home-body';
    }, []);

    const handleFilter = (school) => {
        setFilterSchool(school);
    }

    return (
        <div className="main">
            <Profile />
            <Navbar handleFilter={handleFilter} />
            <FilterList handleFilter={handleFilter} />
            <Timeline filter={filterSchool} />
        </div>
    );
}

export default Home;
