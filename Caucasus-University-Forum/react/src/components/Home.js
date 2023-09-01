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
import StickyNavbar from './StickyNavbar';

const Home = () => {
    const {user, isPending} = useStateContext();
    const {message} = useFlashContext();
    const [isSearched, setIsSearched] = useState(false);
    const [filterSchool, setFilterSchool] = useState(null);
    const [searchQuery, setSearchQuery] = useState(null);
    const [showStickyNavbar, setShowStickyNavbar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 100) { 
                setShowStickyNavbar(true);
            } else {
                setShowStickyNavbar(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    useEffect(() => {
        document.body.className = 'home-body';
    }, []);

    return (
        <div className="main">
            {isPending && <LoadingProfile />}
            {!isPending && <Profile user={user} />}
            <Navbar setSearchQuery={setSearchQuery} setFilterSchool={setFilterSchool} setIsSearched={setIsSearched}/>
            {showStickyNavbar && <StickyNavbar setSearchQuery={setSearchQuery} setFilterSchool={setFilterSchool} setIsSearched={setIsSearched} />}
            <FilterList setFilterSchool={setFilterSchool} />
            <Timeline filterSchool={filterSchool} searchQuery={searchQuery} isSearched={isSearched}/>
            <FlashMessage message={message} />
        </div>
    );
}

export default Home;
