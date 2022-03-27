import React from 'react'
import { Button, Card, CardContent, CardActions, CardMedia, Typography, Grid, AppBar, Toolbar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});


function NoMetamask() {
  return (
    <div className="app">
      <Grid container justifyContent="center" style={{ marginTop: '1rem' }} >
        <Grid>
          <Card sx={{ width: 500, boxShadow: 10 }}>
            <CardMedia
              style={{ margin: 'auto' }}
              component="img"
              height="350"
              image="https://images.ctfassets.net/9sy2a0egs6zh/77mVisJcj8sMquYlW3iq73/1d47648a1511e1e79b5b58bba0bebf80/home_featured.png"
              alt="metamask jpeg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center', textDecoration: 'underline' }}>
                Metamask Not Detected
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'center' }}>
              <Button variant="contained" color="error" onClick={() => window.open('https://metamask.io/download/')}>Install Metamask</Button>
            </CardActions>
          </Card>
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
  )
}

export default NoMetamask;