import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from 'react'
import './App.css'
import Wallet from './Wallet'
import TokenPage from './TokenPage'
import ProfilePage from './ProfilePage'
import { Card, CardMedia, Grid, AppBar, Toolbar } from '@mui/material';
import NotFound from './NotFound';
import NoMetamask from './NoMetamask'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  if (!window.ethereum) return (<NoMetamask />)
  return (
    <div className="app">
      <Grid container justifyContent="center" style={{ marginTop: '1rem' }} >
        <Grid>
          <Card sx={{ width: '80vw', maxWidth: '500px', boxShadow: 10 }}>
            <CardMedia
              style={{ margin: 'auto', maxWidth: '350px' }}
              component="img"
              height="300"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"
              alt="metamask jpeg"
            />
            <BrowserRouter>
              <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path="/" element={<Wallet />} />
                <Route path="/:address" element={<TokenPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </BrowserRouter>
          </Card >
        </Grid>
      </Grid>
      <ThemeProvider theme={darkTheme}>
        <div style={{ marginTop: '100px' }}>
          <AppBar position="fixed" color="secondary" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar style={{ margin: 'auto' }}>
              © 2022 - https://github.com/canerigus
            </Toolbar>
          </AppBar>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
