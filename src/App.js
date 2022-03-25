import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from 'react'
import './App.css'
import Wallet from './Wallet'
import TokenPage from './TokenPage'
import ProfilePage from './ProfilePage'
import { Grid, AppBar, Toolbar } from '@mui/material';
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

  return (
    <div className="app">
      <Grid container justifyContent="center" style={{ marginTop: '1rem' }} >
        <Grid>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={window.ethereum && window.ethereum.isMetaMask ?
                <Wallet /> :
                <NoMetamask />
              } />
              <Route path="/:address" element={<TokenPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </Grid>
      </Grid>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="fixed" color="secondary" sx={{ top: 'auto', bottom: 0 }}>
          <Toolbar style={{ margin: 'auto' }}>
            © 2022 - https://github.com/canerigus
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default App;
