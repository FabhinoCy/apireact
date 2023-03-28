import React from 'react';
import {Router} from "./Router";
import {BrowserRouter, Navigate} from "react-router-dom";

export function RequireAuth({ children }) {
    // TODO Get user from local storage
    const user = localStorage.getItem('token');

    if (user === null) {
        console.log('ici bg fabinax');
        return <Navigate to="/login" replace={true}/>;
    } else {
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