
const mySql = require('./mysql')
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const app = express();
app.use(cors())
app.use(bodyParser.text())
app.use(bodyParser.json())
const port = 3000;

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/login', (req,res) => {
  console.log(`Request Recieve`);
  console.log(req.body);
  
  sleep(2000).then ( () => {
    res.set({
      'Content-Type' : 'text/plain'
    })
    res.send("Login!!");
  })
});

app.post('/signUp', (req,res) => {
  console.log('SignUp requested');
  console.log(req.body);
  
  let input = {}
  let json_input = undefined;

  res.set({'Content-Type' : 'application/json'});

  mySql.Utils.createUser(req.body.email, req.body.pwd)
  .then( results => {
    console.log(results)
    input.status = true;
    input.message = "Success to sign up";
    json_input = JSON.stringify(input);
    res.send(json_input);
  })
  .catch( error => {
    console.log(error);
    input.status = false;
    input.message = error.sqlMessage;
    json_input = JSON.stringify(input);
    res.send(json_input);
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
