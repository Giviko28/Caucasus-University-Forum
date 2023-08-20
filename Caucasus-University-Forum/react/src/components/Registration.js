import { useTranslation } from 'react-i18next';
import {useEffect, useRef, useState} from 'react';
import '../css/registration.css';
import {useStateContext} from "../contexts/StateContext";
import {Redirect} from "react-router-dom";
import axiosClient from "./axios-client";
import useFetch from '../hooks/useFetch';

const Registration = () => {
    const [t] = useTranslation('authreg');
    const { data: schools, isPending, error } = useFetch('/categories');
    const {setUser, setToken, token} = useStateContext();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const categoryRef = useRef();
    const [displayError, setDisplayError] = useState('none');
    const [errorMessage, setErrorMessage] = useState('');
    const [inputErrors, setInputErrors] = useState({
        email: false,
        password: false
    })

    useEffect(() => {
        document.body.className = 'authreg-body';
    }, []);


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
                setDisplayError('none');
                setErrorMessage('');
                setInputErrors({
                    email: false,
                    name: false,
                    password: false,
                    category: false,
                })
            })
            .catch(error => {
                const response = error.response;
                if (response && response.status === 422) {
                    const errorProps = error.response.data;
                    setDisplayError('block');
                    setErrorMessage(errorProps.message);
                    setInputErrors({
                        email: !!errorProps.errors.email,
                        name: !!errorProps.errors.name,
                        password: !!errorProps.errors.password,
                        category: !!errorProps.errors.category,
                    });
                    console.log(response.data.errors);
                }
            })
    }

    return (
        <div>
            <div style={{ display: displayError, color: 'red'}}>{ errorMessage }</div>
            <form onSubmit={onSubmit} className='registration-form'>
                <label style={
                    inputErrors.email? {color: 'red'}: {}
                }>{t('labels.email')}</label><br />
                <input ref={emailRef} type="email" style={
                    inputErrors.email? {color: 'red', borderColor: 'red'}: {}
                }/><br />
                <label style={
                    inputErrors.name? {color: 'red'}: {}
                }>{t('labels.username')}</label><br />
                <input ref={nameRef} type="text" style={
                    inputErrors.name? {color: 'red', borderColor: 'red'}: {}
                }/><br />
                <label style={
                    inputErrors.password? {color: 'red'}: {}
                }>{t('labels.password')}</label><br />
                <input ref={passwordRef} type="password" style={
                    inputErrors.password? {color: 'red', borderColor: 'red'}: {}
                }/><br />
                <label style={
                    inputErrors.password? {color: 'red'}: {}
                }>{t('labels.repeat-password')}</label><br />
                <input ref={passwordConfirmationRef} type="password" style={
                    inputErrors.password? {color: 'red', borderColor: 'red'}: {}
                }/><br />
                <select ref={categoryRef} style={
                    inputErrors.category? {color: 'red', borderColor: 'red'}: {}
                }>
                    <option>{t('labels.choose-school')}</option>
                    {isPending && <p>loading...</p>}
                    {error && <div> {error} </div> }
                    {schools && schools.map((school) => (
                        <option value={school.id}>{school.name}</option>
                    ))}
                </select><br />
                <button className="register-btn">{t('buttons.register')}</button>
            </form>
        </div>
    );
}

export default Registration;
