import './App.css';
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Page/Home/Home";
import LoginPage from "./Page/Login/LoginPage";
import {Router} from "./Router";

export function RequireAuth({ children }) {
    // Used to ensure the refreshToken is called once at a time
    const user = null; // TODO Get user from local storage

    if (user === null) {
        console.log('ici bg fabinax')
        //TODO Navigate to login page
    } else {
        return children;
    }
}

function App() {

//Navigation dans requireAuth
  return (
      <Router/>
  );
}

export default App;