import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import Input from "../Input/Input";

const LoginForm = ({handleSubmit}) => {

    const [credentials, setCredentials] = useState({
        login: '',
        password: ''
    });

    const [loader, setLoader] = useState(false);
    const [erreurForm, setErreurForm] = useState('');

    const handleChange = ({key, value}) => {
        setCredentials((prevState) => {
            return {...prevState, [key]: value};
        });
    };

    const handleLoginChange = (event) => {
        handleChange({
            key: 'login',
            value: event.currentTarget.value
        });
    };

    const handlePasswordChange = (event) => {
        handleChange({
            key: 'password',
            value: event.currentTarget.value
        });
    };

    const handleSubmitForm = async(event) => {
        event.preventDefault();
        console.log(credentials)
        setLoader(true);
        setErreurForm('');
        const data = {
            username: credentials.login,
            password: credentials.password
        }
        axios.post('http://localhost:8000/api/login_check', data)
            .then((res) => {
                setLoader(false);
                console.log('fabien')
                console.log(res.data)
                localStorage.setItem('token', res.data.token)
                window.location.href = '/'
            })
            .catch((err) => {
                setLoader(false);
                setErreurForm('Les identifiants ne sont pas valides.')
                console.log(err.response.data)
                localStorage.removeItem('token')
            })
        await handleSubmit(credentials);
    };
    //TODO Add Credentials Inputs (With Input Component)
    return (
        <>

            {
                loader ?
                <>
                <div className="overlay">
                    <div className="lds-dual-ring"></div>
                </div>
                </>
                : ''
            }

            {
                erreurForm ?
                <>
                <div className="blocErreur">
                    <p>{erreurForm}</p>
                </div>
                </>
                : ''
            }

            <form id="login-form" onSubmit={handleSubmitForm}>

                <div className='credentials-and-password-container'>

                    <Input
                        id='login'
                        label='Adresse mail'
                        value={credentials.login}
                        type='mail'
                        required={true}
                        placeholder='admin@admin.fr'
                        handleChange={handleLoginChange}
                    />

                    <Input
                        id='password'
                        label='Mot de passe'
                        value={credentials.password}
                        type='password'
                        required={true}
                        placeholder='********'
                        handleChange={handlePasswordChange}
                    />
                    <button
                        className='login-page-call-to-action'
                        type="submit"
                    >
                        Se connecter
                    </button>

                </div>
            </form>
        </>
    );
};

export default LoginForm;
