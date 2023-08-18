import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import '../css/registration.css';
import {useStateContext} from "../contexts/StateContext";
import {Redirect} from "react-router-dom";

const Registration = () => {
    const [t, i18n] = useTranslation('authreg');

    useEffect(() => {
        document.body.className = 'authreg-body';
    }, []);

    const {user, token} = useStateContext();

    if (token) {
        return <Redirect to='/'/>
    }

    return (
        <div>
            <form className='registration-form'>
                <label>{t('labels.email')}</label><br />
                <input type="text" /><br />
                <label>{t('labels.username')}</label><br />
                <input type="text" /><br />
                <label>{t('labels.password')}</label><br />
                <input type="password" /><br />
                <label>{t('labels.repeat-password')}</label><br />
                <input type="password" /><br />
                <select>
                    <option>{t('labels.choose-school')}</option>
                    <option>CSB</option>
                    <option>CSL</option>
                    <option>CST</option>
                    <option>CSA</option>
                    <option>CSH</option>
                    <option>CTS</option>
                    <option>CSM</option>
                    <option>CTE</option>
                    <option>CES</option>
                </select><br />
                <button className="register-btn">{t('buttons.register')}</button>
            </form>
        </div>
    );
}

export default Registration;
