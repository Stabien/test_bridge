const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const base64 = require('base-64');
const PORT = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setting headers to allow CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

fetch('http://localhost:3000/login', {
  method: 'POST',
  headers: {
    'Authorization': 'Basic ' + base64.encode('BankinClientId' + ":" + 'secret'),
    'Content-type': 'application/json'
  },
  body: {
    user: 'BankinUser',
    password: '12345678'
  }
})
.then(response => response.json())
.then(response => {
  fetch('http://localhost:3000/token', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: 'grant_type=refresh_token&refresh_token=' + response
  })
  .then(response => response.json())
  .then(response => {
    fetch('http://localhost:3000/accounts', {
      headers: {
        'Authorization': 'Token ' + response
      }
    })
  })
  .catch(error => console.log(error))
})
.catch(error => console.log(error))

app.listen(PORT, () => {
  console.log('Application running !');
});
