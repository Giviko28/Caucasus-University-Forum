import { useTranslation } from 'react-i18next';
import '../css/authorization.css';
import {Link, Redirect} from 'react-router-dom';
import {useEffect, useRef, useState} from 'react';
import {useStateContext} from "../contexts/StateContext";
import axiosClient from "./axios-client";

const Authorization = () => {
    const [t, i18n] = useTranslation('authreg');
    const {setToken, setUser, token} = useStateContext();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [displayError, setDisplayError] = useState('none');
    const [errorMessage, setErrorMessage] = useState(null);
    const [inputErrors, setInputErrors] = useState({
        email: false,
        password: false
    })

    useEffect(() => {
        document.body.className = 'authreg-body';
    }, []);

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        axiosClient.post('/login', payload)
            .then(response => {
                const data = response.data;
                setUser(data.user);
                setToken(data.token);
                setDisplayError('none');
                setErrorMessage(null);
                setInputErrors({
                    email: false,
                    password: false,
                })
            })
            .catch(error => {
                const errorProps = error.response.data;
                console.log('test');
                setDisplayError('block');
                setErrorMessage(errorProps.message);
                setInputErrors({
                    email: !!errorProps.errors.email, 
                    password: !!errorProps.errors.password, 
                });
                console.log(error);
            })
    }
    // const changeLanguage = (lang) => {
    //     i18n.changeLanguage(lang);
    // }
    if (token) {
        return <Redirect to='/'/>
    }

    return (
        <div>
            <div style={{ display: displayError, color: 'red'}}>{ errorMessage }</div>
            <form onSubmit={onSubmit} className='authorization-form'>
                <label>{t('labels.email')}</label><br />
                <input ref={emailRef} type="email" style={inputErrors.email? {borderColor: 'red'}: {}} /><br />
                <label>{t('labels.password')}</label><br />
                <input ref={passwordRef} type="password" style={inputErrors.password? {borderColor: 'red'}: {}} /><br />
                <button className='forgot-pass-btn'>{ t('buttons.forgot-pass') }</button><br />
                <button className='login-btn'>{ t('buttons.log-in') }</button><br />
                <Link to="/registration" className="to-register-btn">{ t('buttons.register') }</Link>
            </form>
            {/* <div className="buttons">
                <button onClick={() => changeLanguage('ge')}>ქართული</button>
                <button onClick={() => changeLanguage('en')}>english</button>
            </div> */}
        </div>
    );
}

export default Authorization;

