import { useTranslation } from 'react-i18next';
import '../css/authorization.css';
import {Link, Redirect} from 'react-router-dom';
import { useEffect } from 'react';
import {useStateContext} from "../contexts/StateContext";

const Authorization = () => {

    const [t, i18n] = useTranslation('authreg');

    useEffect(() => {
        document.body.className = 'authreg-body';
    }, []);

    const {user, token} = useStateContext();

    if (token) {
        return <Redirect to='/'/>
    }



    // const changeLanguage = (lang) => {
    //     i18n.changeLanguage(lang);
    // }

    return (
        <div>
            <form className='authorization-form'>
                <label>{t('labels.email')}</label><br />
                <input type="text" /><br />
                <label>{t('labels.password')}</label><br />
                <input type="password" /><br />
                <button className='forgot-pass-btn'>{t('buttons.forgot-pass')}</button><br />
                <button className='login-btn'>{t('buttons.log-in')}</button><br />
                <Link to="/registration" className="to-register-btn">{t('buttons.register')}</Link>
            </form>
            {/* <div className="buttons">
                <button onClick={() => changeLanguage('ge')}>ქართული</button>
                <button onClick={() => changeLanguage('en')}>english</button>
            </div> */}
        </div>
    );
}

export default Authorization;

