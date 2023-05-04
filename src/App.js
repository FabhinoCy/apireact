import React, {useState, useEffect} from 'react';
import {Router} from "./Router";
import {BrowserRouter, Navigate} from "react-router-dom";
import axios from "axios";

export function RequireAuth({ children }) {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            axios
                .get('http://localhost:8000/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setUser(res.data);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
        }
    }, [token]);

    if (!user) {
        return <Navigate to="/login" replace={true} />;
    }

    return children;
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