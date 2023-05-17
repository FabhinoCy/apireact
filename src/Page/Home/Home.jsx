import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Home.css";

const HomePage = () => {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        getCharacters();
    }, [page]);

    const getCharacters = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/characters?page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setCharacters((prevCharacters) => [
                ...prevCharacters,
                ...response.data["hydra:member"],
            ]);
            setTotalPages(response.data["hydra:totalItems"]);
        } catch (error) {
            console.error(error);
        }
    };

    const goToNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    }

    return (
        <div>
            <h1>Home page</h1>
            <h2>Bonjour {user && user.user.email}</h2>
            <span className="logout" onClick={logout}>Se déconnecter</span>
            {
                characters.length > 0 ?
                    <h3>Liste des personnages Rick et Morty</h3>
                    : ''
            }
            <InfiniteScroll
                dataLength={characters.length}
                next={goToNextPage}
                hasMore={page < totalPages}
                loader={<h4>Loading...</h4>}
            >
                <div className="row">
                    {characters.map((character, index) => (
                        <div className="col-4" key={index}>
                            <img src={character.image} alt={character.name} />
                            <div>
                                <span className="nom">{character.name}</span>
                                <span>{character.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default HomePage;