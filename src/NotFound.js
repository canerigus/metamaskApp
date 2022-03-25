import React from 'react'
import { Button, Card, CardContent, CardActions, CardMedia, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  let navigate = useNavigate();

  return (
    <Card sx={{ width: 500, boxShadow: 10 }}>
      <CardMedia
        style={{ margin: 'auto' }}
        component="img"
        height="350"
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"
        alt="metamask jpeg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center', textDecoration: 'underline' }}>
          Page does not exist!
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
        <Button variant="contained" color="error" onClick={() => navigate('/')}>Go Back</Button>
      </CardActions>
    </Card>
  )
}
