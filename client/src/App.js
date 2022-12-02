import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { accessToken, logout, getCurrentUserProfile } from './Spotify.js';
import { catchErrors } from './utils';
import { GlobalStyle } from './styles';
import styled from 'styled-components/macro';
import { Login } from './pages';

function App() {
    const [token, setToken] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        setToken(accessToken);

        const fetchData = async () => {
            const { data } = await getCurrentUserProfile();
            setProfile(data);
        };

        catchErrors(fetchData());
    }, []);

    return (
        <div className="App">
            <GlobalStyle />
            <header className="App-header">
                {!token ? (
                    <Login />
                ) : (
                    <Router>
                        <Routes>
                            <Route
                                path="/top-artists"
                                element={<h1>Top Artists</h1>}></Route>
                            <Route
                                path="/top-tracks"
                                element={<h1>Top Tracks</h1>}></Route>
                            <Route
                                path="/playlists/:id"
                                element={<h1>Playlist</h1>}></Route>
                            <Route
                                path="/playlists"
                                element={<h1>Playlists</h1>}></Route>
                            <Route
                                path="/"
                                element={
                                    <>
                                        <button onClick={logout}>
                                            Log Out
                                        </button>

                                        {profile && (
                                            <div>
                                                <h1>{profile.display_name}</h1>
                                                <p>
                                                    {profile.followers.total}{' '}
                                                    Followers
                                                </p>
                                                {profile.images.length &&
                                                    profile.images[0].url && (
                                                        <img
                                                            src={
                                                                profile
                                                                    .images[0]
                                                                    .url
                                                            }
                                                            alt="Avatar"
                                                        />
                                                    )}
                                            </div>
                                        )}
                                    </>
                                }></Route>
                        </Routes>
                    </Router>
                )}
            </header>
        </div>
    );
}

export default App;
