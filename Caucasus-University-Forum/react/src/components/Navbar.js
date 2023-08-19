import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {useStateContext} from "../contexts/StateContext";


const Navbar = () => {
    const [t, i18n] = useTranslation('navbar');
    const {token} = useStateContext();
    return (
        <nav className="navigation-bar">
            <button>{t('home')}</button>
            <button>{t('clubs')}</button>
            {!token ? (<Link to="/authorization"><button className="login">{t('login')}</button></Link>) : (<Link to="/logout"><button className="login">{t('Log out')}</button></Link>)}
            <input type="text" placeholder={t('search')} />
        </nav>
    );
}

export default Navbar;
