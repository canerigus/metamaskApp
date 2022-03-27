import React from 'react'
import { Button, CardContent, CardActions, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  let navigate = useNavigate();
  return (
    <>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center', textDecoration: 'underline' }}>
          Page does not exist!
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
        <Button variant="contained" color="error" onClick={() => navigate('/')}>Go Back</Button>
      </CardActions>
    </>
  )
}
