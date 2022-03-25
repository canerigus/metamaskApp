import React, { useState, useEffect } from 'react'
import { Button, Card, CardContent, CardActions, CardMedia, TextField, Divider, Alert, AlertTitle } from '@mui/material';
import { useNavigate } from "react-router-dom";

function ProfilePage() {

  const [accountAddress, setAccountAddress] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState('')
  const [userMessage, setUserMessage] = useState('')
  const [signature, setSignature] = useState(null)
  let navigate = useNavigate()

  useEffect(() => {
    async function checkUser() {
      if (window.ethereum && window.ethereum.isMetaMask) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        }).catch((e) => {
          console.error(e.message)
          setErrorMessage(e.message)
          return
        })
        setAccountAddress(accounts[0])
      } else {
        console.log('Not connected')
        navigate('/')
      }
    }
    checkUser();
    // eslint-disable-next-line
  }, []);

  const signMessage = async (message) => {
    const data = await window.ethereum
      .request({ method: 'personal_sign', params: [message, window.ethereum.selectedAddress] })
      .catch((e) => {
        setErrorMessage(e.message)
        return
      })
    setSignature(data)
  }

  const signUser = async (e) => {
    e.preventDefault();
    if (userMessage === "") {
      setErrorMessage('Enter a message')
    } else {
      setMessage(userMessage)
      await signMessage(userMessage)
    }
  };

  const disconnectWallet = () => {
    navigate('/')
    window.location.reload();
  }
  const goToken = () => {
    navigate(`/${window.ethereum.selectedAddress}`)
  }


  function handleUserMessageChange(event) {
    setUserMessage(event.target.value)
  }

  function accountChanged() {
    window.location.reload();
  }

  if (window.ethereum && window.ethereum.isMetaMask) {
    window.ethereum.on('accountsChanged', accountChanged);
  }

  return (
    <>
      <Card sx={{ width: 500, boxShadow: 10 }}>
        <CardMedia
          style={{ margin: 'auto' }}
          component="img"
          height="350"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"
          alt="metamask jpeg"
        />
        <form onSubmit={signUser}>
          <CardContent style={{ paddingBottom: '2px' }} >
            <TextField fullWidth
              value={accountAddress} id="outlined" disabled
              label="Wallet Address" style={{ marginBottom: '1rem' }} />
            <Divider style={{ marginBottom: '1rem' }} />
            <TextField
              fullWidth
              id="outlined"
              label="Enter a message"
              style={{ marginBottom: '1rem' }}
              value={userMessage}
              onChange={handleUserMessageChange}
            />
            <CardActions style={{ justifyContent: 'center', padding: '4px' }}>
              <Button variant="contained" type="submit" style={{ padding: '6px 37px' }} color="success"> Sign In </Button>
            </CardActions>
          </CardContent >
        </form>
        <CardActions style={{ justifyContent: 'center', padding: '4px', marginBottom: '1rem' }}>
          <Button variant="contained" color="primary" onClick={goToken}> Token Page </Button>
          <Button variant="contained" color="error" onClick={disconnectWallet}> Disconnect </Button>
        </CardActions>
        {
          signature &&
          <Alert severity="success">
            <AlertTitle><strong>Success</strong></AlertTitle>
            <p style={{
              marginBottom: '0.3rem',
              width: '425px',
              wordWrap: 'break-word'
            }}><strong>Message:</strong> {message}</p>
            <Divider />
            <p style={{
              marginTop: '0.3rem',
              width: '425px',
              wordWrap: 'break-word'
            }}><strong>Signature:</strong><span>{signature}</span></p>
          </Alert>
        }
      </Card>
      {
        errorMessage &&
        <Alert severity="error">
          <AlertTitle><strong>Error</strong></AlertTitle>
          <p style={{
            margin: '0',
            width: '425px',
            wordWrap: 'break-word'
          }}>{errorMessage}</p>
        </Alert>
      }
    </>
  )
}



export default ProfilePage;