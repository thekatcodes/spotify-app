import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { accessToken, logout, getCurrentUserProfile } from './Spotify.js';
import { catchErrors } from './utils';
import styled, { createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
  :root {
    --black: #121212;
    --green: #1DB954;
    --white: #ffffff;

    --font: 'Circular Std', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  }

  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: var(--black);
    color: var(--white);
    font-family: var(--font);
  }
`;

const StyledLoginButton = styled.a`
    background-color: var(--green);
    color: var(--white);
    padding: 10px 20px;
    margin: 20px;
    border-radius: 30px;
    display: inline-block;
`;

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
                    <StyledLoginButton
                        className="App-link"
                        href="http://localhost:8888/login">
                        Log in to Spotify
                    </StyledLoginButton>
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
