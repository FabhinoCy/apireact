import React, {useState, useEffect} from 'react';
import {Router} from "./Router";
import {BrowserRouter, Navigate} from "react-router-dom";
import axios from "axios";

export function RequireAuth({ children }) {
    // TODO Get user from local storage
    const token = localStorage.getItem('token');

    if (token === null) {
        return <Navigate to="/login" replace={true}/>;
    } else {
        axios.get('http://localhost:8000/api/users/me', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then((res) => {
                console.log(res.data);
                // set user in local storage
                localStorage.setItem('user', JSON.stringify(res.data));
            })
            .catch((err) => {
                console.log(err.response.data);
                console.log('pas ok');
            })
        return children;
    }
}

function App() {
    return (
        <BrowserRouter>
            <RequireAuth/>
            <Router/>
        </BrowserRouter>
    );
}

export default App;