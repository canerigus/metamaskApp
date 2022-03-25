import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import { Card, CardContent, CardActions, CardMedia } from '@mui/material';
import { Divider, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import Web3 from 'web3'

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA))

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

function TokenPage() {

  const [accountAddress, setAccountAddress] = useState('')
  const [accountBalance, setAccountBalance] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  let navigate = useNavigate()
  let params = useParams();

  useEffect(() => {
    async function checkUser() {
      if (window.ethereum && window.ethereum.isMetaMask) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        }).catch((e) => {
          console.error(e.message)
          return
        })
        if (accounts[0] === params.address) {
          setAccountAddress(accounts[0])
          let balance = await getAccountBalance(accounts[0])
          let balanceFloat = parseFloat(web3.utils.fromWei(balance, "ether"))
          setAccountBalance(balanceFloat)
        } else {
          console.log('Address is not valid')
          navigate('/')
        }
      } else {
        console.log('No wallet')
        navigate('/')
      }
    }
    checkUser();
    // eslint-disable-next-line
  }, []);

  async function getAccountBalance(address) {
    const balance = await web3.eth.getBalance(address)
      .catch(err => {
        console.log(err.message)
        setErrorMessage(err.message)
        return 0
      })
    return balance
  }

  const disconnectWallet = () => {
    navigate('/')
    window.location.reload();
  }

  const goProfile = () => {
    navigate('/profile')
  }

  function accountChanged() {
    window.location.reload();
  }

  if (window.ethereum && window.ethereum.isMetaMask) {
    window.ethereum.on('accountsChanged', accountChanged);
  }

  return (
    <Card sx={{ width: 500, boxShadow: 10 }}>
      <CardMedia
        style={{ margin: 'auto' }}
        component="img"
        height="350"
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"
        alt="metamask jpeg"
      />
      <CardContent style={{ padding: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <List sx={style} component="nav" aria-label="mailbox folders" style={{ minWidth: '450px' }}>
          <ListItem>
            <ListItemText primary="Wallet Address" secondary={`${accountAddress}`} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Balance" secondary={`${accountBalance} ETH`} />
          </ListItem>
        </List>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={goProfile}> Profile </Button>
        <Button variant="contained" color="error" onClick={disconnectWallet}> Disconnect </Button>
      </CardActions>
      <div>{errorMessage}</div>
    </Card>
  )
}


export default TokenPage;