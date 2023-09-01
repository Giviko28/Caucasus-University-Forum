import { useState, useEffect } from 'react';
import '../css/index.css';
import Profile from './Profile';
import Navbar from  './Navbar';
import FilterList from  './FilterList';
import Timeline from './Timeline';
import {useStateContext} from "../contexts/StateContext";
import LoadingProfile from './loading-components/LoadingProfile';
import FlashMessage from "./FlashMessage";
import {useFlashContext} from "../contexts/FlashContext";

const Home = () => {
    const {user, isPending} = useStateContext();
    const {message} = useFlashContext();
    const [isSearched, setIsSearched] = useState(false);
    const [filterSchool, setFilterSchool] = useState(null);
    const [searchQuery, setSearchQuery] = useState(null);


    useEffect(() => {
        document.body.className = 'home-body';
    }, []);

    return (
        <div className="main">
            {isPending && <LoadingProfile />}
            {!isPending && <Profile user={user} />}
            <Navbar setSearchQuery={setSearchQuery} setFilterSchool={setFilterSchool} setIsSearched={setIsSearched}/>
            <FilterList setFilterSchool={setFilterSchool} />
            <Timeline filterSchool={filterSchool} searchQuery={searchQuery} isSearched={isSearched}/>
            <FlashMessage message={message} />
        </div>
    );
}

export default Home;
