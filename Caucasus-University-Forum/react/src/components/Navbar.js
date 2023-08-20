import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {useStateContext} from "../contexts/StateContext";
import axiosClient from "./axios-client";


const Navbar = ({handleFilter}) => {
    const [t, i18n] = useTranslation('navbar');
    const {user, setUser, setToken} = useStateContext();

    const logOut = (ev) => {
        ev.preventDefault();
        axiosClient.post('/logout')
            .then(() => {
                setUser(null);
                setToken(null);
            })
            .catch(error => {
                if (error.response.status === 401) {
                    alert('You must be logged in to log out you buffoon');
                }
            })
    }

    return (
        <nav className="navigation-bar">
            <button onClick={() => handleFilter(null)}>{t('home')}</button>
            <button>{t('clubs')}</button>
            {!user ? (<Link to="/authorization"><button className="login">{t('login')}</button></Link>) : (<Link to="/authorization"><button onClick={logOut} className="logout">{t('Log out')}</button></Link>)}
            <input type="text" placeholder={t('search')} />
        </nav>
    );
}

export default Navbar;
