import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";

export default function App() {
    const [players, setPlayers] = useState([]);
    const [playersLoading, setPlayersLoading] = useState(true);
    const [playersError, setPlayersError] = useState(null);

    const [games, setGames] = useState([]);
    const [gamesLoading, setGamesLoading] = useState(true);
    const [gamesError, setGamesError] = useState(null);

    useEffect(() => {
        fetchPlayers();
        fetchGames();
    }, []);

    const fetchPlayers = () => {
        fetch("https://free-nba.p.rapidapi.com/players?page=0&per_page=100", {
            method: "GET",
            headers: {
                "x-rapidapi-host": "free-nba.p.rapidapi.com",
                "x-rapidapi-key":
                    "03f75e5346mshe102d9b0cdcb5a0p1a7f92jsndd8d5123e45a",
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((result) => {
                setPlayers(result.data);
            })
            .catch((error) => {
                console.error("Error fetching data", error);
                setPlayersError(error);
            })
            .finally(() => {
                setPlayersLoading(false);
            });
    };

    const fetchGames = () => {
        fetch("https://free-nba.p.rapidapi.com/games?page=0&per_page=100", {
            method: "GET",
            headers: {
                "x-rapidapi-host": "free-nba.p.rapidapi.com",
                "x-rapidapi-key":
                    "03f75e5346mshe102d9b0cdcb5a0p1a7f92jsndd8d5123e45a",
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((result) => {
                setGames(result.data);
            })
            .catch((error) => {
                console.error("Error fetching data", error);
                setGamesError(error);
            })
            .finally(() => {
                setGamesLoading(false);
            });
    };

    const sortedGames =
        games.sort((a, b) => new Date(b.date) - new Date(a.date)) &&
        games.sort((a, b) => (a.price > b.price ? -1 : 1));
    
    const lastThreeGamesTopScorers = sortedGames.slice(0,3);  

    return (
        <div className="App">
            <Header />
            <h2>Players</h2>
            {playersLoading && <p>Players are loading</p>}
            {playersError && <p>{playersError}</p>}

            <ol>
                {players
                    .filter((player) => player.team.id === 10)
                    ?.map((filteredplayer) => (
                        <li key={filteredplayer.id} style={{ margin: "30px" }}>
                            <div>{`Full Name: ${filteredplayer.first_name} ${filteredplayer.last_name}`}</div>
                            <div>{`Team_ID: ${filteredplayer.team.id}`}</div>
                            <div>{`Team_Name: ${filteredplayer.team.full_name}`}</div>
                        </li>
                    ))}
            </ol>
            <h2>Games</h2>
            {gamesLoading && <p>Games are loading</p>}
            {gamesError && <p>{gamesError}</p>}
            <ol>
                {lastThreeGamesTopScorers?.map((game) => (
                    <li key={game.id} style={{ margin: "30px" }}>
                        {/* <div>{`Team_ID: ${game.id}`}</div> */}
                        <div>{`Date: ${game.date}`}</div>
                        <div>{`Game_Score: ${game.home_team_score}`}</div>
                        <div>{`Team_Name: ${game.home_team.full_name}`}</div>
                    </li>
                ))}
            </ol>
        </div>
    );
}
