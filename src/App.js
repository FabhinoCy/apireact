import React, {useEffect} from 'react';
import {Router} from "./Router";
import {BrowserRouter, Navigate} from "react-router-dom";
import axios from "axios";

export function RequireAuth({ children }) {
    // TODO Get user from local storage
    const user = localStorage.getItem('token');

    if (user === null) {
        return <Navigate to="/login" replace={true}/>;
    } else {
        axios.get('http://localhost:8000/api/users/me', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then((res) => {
                console.log(res.data);
                console.log('ok');
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