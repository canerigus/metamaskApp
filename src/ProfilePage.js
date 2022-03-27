import React, { useState, useEffect } from 'react'
import { Button, CardContent, CardActions, TextField, Divider, Alert, AlertTitle, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Web3 from 'web3'



function ProfilePage() {
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA))
  const [accountAddress, setAccountAddress] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [userMessage, setUserMessage] = useState('')
  const [displaySignature, setDisplaySignature] = useState(null)
  const [displayAddress, setDisplayAddress] = useState(null)
  const [message, setMessage] = useState('')
  const [signature, setSignature] = useState('')

  let navigate = useNavigate()

  useEffect(() => {
    async function checkUser() {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      }).catch((e) => {
        console.error(e.message)
        setErrorMessage(e.message)
        return
      })
      setAccountAddress(accounts[0])
    }
    checkUser();
    // eslint-disable-next-line
  }, []);

  const signMessage = async (userMessage) => {
    const data = await window.ethereum
      .request({ method: 'personal_sign', params: [userMessage, window.ethereum.selectedAddress] })
      .catch((e) => {
        console.log(e)
        setErrorMessage(e)
        return
      })
    setDisplaySignature(data)
  }

  const signUser = async (e) => {
    e.preventDefault();
    if (userMessage === "") {
      setErrorMessage('Enter a message')
    } else {
      setUserMessage(userMessage)
      let hexMessage = web3.utils.utf8ToHex(userMessage)
      await signMessage(hexMessage)
    }
  };

  const verifyUser = async (e) => {
    e.preventDefault();
    if (message === "" || signature === "") {
      setErrorMessage('Enter a message or signature')
    } else {
      setMessage(message)
      setSignature(signature)
      await verify(message, signature)
    }
  };

  const verify = async (message, signature) => {
    try {
      const verifiedAddress = web3.eth.accounts.recover(message, signature);
      if (verifiedAddress.toLowerCase() !== accountAddress.toLowerCase()) {
        setErrorMessage('Wrong signature or message')
      } else {
        setDisplayAddress(verifiedAddress)
      }
    } catch (error) {
      setErrorMessage("Wrong signature format -" + error.message)
    }
  }

  const disconnectWallet = () => {
    navigate('/')
    window.location.reload();
  }

  const refresh = () => {
    setMessage('')
    setUserMessage('')
    setSignature('')
    setErrorMessage(null)
    setDisplaySignature(null)
    setDisplayAddress(null)
  }

  const goToken = () => {
    navigate(`/${window.ethereum.selectedAddress}`)
  }

  function handleUserMessageChange(event) {
    setUserMessage(event.target.value)
  }
  function handleMessage(event) {
    setMessage(event.target.value)
  }
  function handleSignature(event) {
    setSignature(event.target.value)
  }
  function accountChanged() {
    window.location.reload();
  }
  if (window.ethereum && window.ethereum.isMetaMask) {
    window.ethereum.on('accountsChanged', accountChanged);
  }
  return (
    <>
      <form onSubmit={signUser}>
        <Typography variant="h6" component="div" style={{ color: '#4d4b4b', textAlign: 'center', textDecoration: 'underline', marginTop: '1rem' }}>
          Sign Message
        </Typography>
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
            <Button variant="contained" type="submit" style={{ padding: '6px 37px' }} color="success"> Sign </Button>
          </CardActions>
        </CardContent >
      </form>
      <form onSubmit={verifyUser}>
        <Typography variant="h6" component="div" style={{ color: '#4d4b4b', textAlign: 'center', textDecoration: 'underline', marginTop: '1rem' }}>
          Verify Message
        </Typography>
        <CardContent sx={{ borderBottom: 1, borderColor: 'grey.500' }} style={{ paddingBottom: '10px' }}>
          <TextField
            fullWidth
            id="outlined"
            label="Enter The Message"
            style={{ marginBottom: '1rem' }}
            value={message}
            onChange={handleMessage}
          />
          <Divider style={{ marginBottom: '1rem' }} />
          <TextField
            fullWidth
            id="outlined"
            label="Enter The Signature"
            style={{ marginBottom: '1rem' }}
            value={signature}
            onChange={handleSignature}
          />
          <CardActions style={{ justifyContent: 'center', padding: '4px' }}>
            <Button variant="contained" type="submit" style={{ padding: '6px 37px' }} color="success"> Verify </Button>
          </CardActions>
        </CardContent >
      </form>
      <CardActions style={{ justifyContent: 'center', padding: '4px', marginBottom: '1rem', marginTop: '10px' }}>
        <Button variant="contained" color="primary" onClick={goToken}> Token Page </Button>
        <Button variant="contained" color="error" onClick={disconnectWallet}> Disconnect </Button>
        <Button variant="contained" color="secondary" onClick={refresh}> Refresh </Button>
      </CardActions>
      {
        displaySignature &&
        <Alert severity="success">
          <AlertTitle><strong>Success - Message Signed</strong></AlertTitle>
          <p style={{
            marginBottom: '0.3rem',
            width: '425px',
            wordWrap: 'break-word'
          }}><strong>Message:</strong> {userMessage}</p>
          <Divider />
          <p style={{
            marginTop: '0.3rem',
            width: '425px',
            wordWrap: 'break-word'
          }}><strong>Signature:</strong><span>{displaySignature}</span></p>
        </Alert>
      }
      {
        displayAddress &&
        <Alert severity="success">
          <AlertTitle><strong>Success - Signature Verified</strong></AlertTitle>
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
          }}><strong>Address:  </strong><span>{displayAddress.toLowerCase()}</span></p>
        </Alert>
      }
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