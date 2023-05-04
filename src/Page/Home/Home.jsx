import React, {useState, useEffect} from "react";
import {Navigate} from "react-router-dom";
import "./Home.css";
import axios from "axios";

const Home = (props) => {

    const [user, setUser] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/me', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then((res) => {
                console.log(res.data.user.email);
                setUser(res.data.user.email);
            })
    }, [])

    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    }

    return(
        <div>
            <h1>Home page</h1>
            {
                user ? <h3>Bonjour {user}</h3> : ''
            }
            <span className="logout" onClick={logout}>Se déconnecter</span>
        </div>
    )
}

export default Home;