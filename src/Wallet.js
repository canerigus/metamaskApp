import React, { useState } from 'react'
import { Typography, Button } from '@mui/material';
import { Card, CardContent, CardActions, CardMedia, Alert, AlertTitle } from '@mui/material';
import Web3 from 'web3'
import { useNavigate } from "react-router-dom";

export default function Wallet() {
  const [errorMessage, setErrorMessage] = useState(null)
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA))
  let navigate = useNavigate();

  async function connectWallet() {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    })
      .catch((e) => {
        console.error(e.message)
        setErrorMessage(e.message)
        return
      })
    if (!accounts) {
      return
    }

    let balance = await getAccountBalance(accounts[0])
    let balanceFloat = parseFloat(web3.utils.fromWei(balance, "ether"))
    if (balanceFloat === 0) {
      navigate(`/${accounts[0]}`)
    } else {
      navigate(`/profile`)
    }
  }

  async function getAccountBalance(address) {
    const balance = await web3.eth.getBalance(address)
      .catch(err => {
        console.log(err.message)
        setErrorMessage(err.message)
        return 0
      })
    return balance
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
        <CardContent style={{ paddingBottom: '0' }}>
          <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center' }}>
            Metamask Login App
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
          <Button sx={{ backgroundColor: '#2E7B8C' }} variant="contained" color="success" onClick={connectWallet}>Connect Wallet</Button>
        </CardActions>
      </Card >
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
