import React from 'react'
import { Button, Card, CardContent, CardActions, CardMedia, Typography } from '@mui/material';

function NoMetamask() {
  return (
    <Card sx={{ width: 500 }}>
      <CardMedia
        style={{ margin: 'auto' }}
        component="img"
        height="350"
        image="https://images.ctfassets.net/9sy2a0egs6zh/77mVisJcj8sMquYlW3iq73/1d47648a1511e1e79b5b58bba0bebf80/home_featured.png"
        alt="metamask jpeg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center', textDecoration: 'underline' }}>
          Metamask Not Found
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
        <Button variant="contained" color="error" onClick={() => window.open('https://metamask.io/download/')}>Install Metamask</Button>
      </CardActions>
    </Card>
  )
}

export default NoMetamask;