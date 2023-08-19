import { useTranslation } from 'react-i18next';
import {useEffect, useRef} from 'react';
import '../css/registration.css';
import {useStateContext} from "../contexts/StateContext";
import {Redirect} from "react-router-dom";
import axiosClient from "./axios-client";

const Registration = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const categoryRef = useRef();

    const [t, i18n] = useTranslation('authreg');

    useEffect(() => {
        document.body.className = 'authreg-body';
    }, []);

    const {setUser, setToken, token} = useStateContext();

    if (token) {
        return <Redirect to='/'/>
    }


    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            category: categoryRef.current.value
        }
        axiosClient.post('/signup', payload)
            .then(response => {
                const data = response.data;
                setUser(data.user);
                setToken(data.token);
            })
            .catch(error => {
                const response = error.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            })
    }

    return (
        <div>
            <form onSubmit={onSubmit} className='registration-form'>
                <label>{t('labels.email')}</label><br />
                <input ref={emailRef} type="email" /><br />
                <label>{t('labels.username')}</label><br />
                <input ref={nameRef} type="text" /><br />
                <label>{t('labels.password')}</label><br />
                <input ref={passwordRef} type="password" /><br />
                <label>{t('labels.repeat-password')}</label><br />
                <input ref={passwordConfirmationRef} type="password" /><br />
                <select ref={categoryRef}>
                    <option>{t('labels.choose-school')}</option>
                    <option value={1}>CSB</option>
                    <option value={2}>CSL</option>
                    <option value={3}>CST</option>
                    <option value={4}>CSA</option>
                    <option value={5}>CSH</option>
                    <option value={6}>CTS</option>
                    <option value={7}>CSM</option>
                    <option value={8}>CTE</option>
                    <option value={9}>CES</option>
                </select><br />
                <button className="register-btn">{t('buttons.register')}</button>
            </form>
        </div>
    );
}

export default Registration;
