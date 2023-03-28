import React from 'react';
import {Router} from "./Router";
import {BrowserRouter, Navigate} from "react-router-dom";

export function RequireAuth({ children }) {
    const user = null; // TODO Get user from local storage

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