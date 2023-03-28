// Genral imports
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';

// Style imports
import './LoginForm.css';
import Input from "../Input/Input";

const LoginForm = ({handleSubmit}) => {

    const [credentials, setCredentials] = useState({
        login: '',
        password: ''
    });

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
        const data = {
            username: credentials.login,
            password: credentials.password
        }
        axios.post('http://localhost:8000/api/login_check', data)
            .then((res) => {
                console.log(res.data)
                // set token in local storage
                localStorage.setItem('token', res.data.token)
                window.location.href = '/'
            })
            .catch((err) => {
                console.log(err.response.data)
                localStorage.removeItem('token')
            })
        await handleSubmit(credentials);
    };
    //TODO Add Credentials Inputs (With Input Component)
    return (
        <>

            <form id="login-form" onSubmit={handleSubmitForm}>

                <div className='credentials-and-password-container'>

                    <Input
                        id='login'
                        label='Login'
                        value={credentials.login}
                        type='text'
                        required={true}
                        placeholder='Login'
                        handleChange={handleLoginChange}
                    />

                    <Input
                        id='password'
                        label='Password'
                        value={credentials.password}
                        type='password'
                        required={true}
                        placeholder='Password'
                        handleChange={handlePasswordChange}
                    />
                    <button
                        className='login-page-call-to-action'
                        type="submit"
                    >
                        Submit
                    </button>

                </div>
            </form>
        </>
    );
};

export default LoginForm;
