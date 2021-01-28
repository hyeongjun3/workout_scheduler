
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

// TODO : login 시 accss token 주고 관리
app.post('/login', (req,res) => {
  console.log(`Request Recieve`);
  console.log(req.body);

  mySql.Utils.readUser(req.body.email, req.body.pwd)
  .then ( results => {
    let input = {}

    if (results.length === 0) {
      input.status = false;
      input.message = "이메일 또는 비밀번호를 확인하세요";
    } else {
      input.status = true;
      input.accessToken = 1;
      input.message = "성공"
    }

    return input;
  })
  .then( input => {
    let json_input = JSON.stringify(input);

    res.set({'Content-type' : 'application/json'})
    res.send(json_input);
  })
  .catch (error => {
    console.log(error);
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
    let msg = "";
    if (error.errno === 1062) {
      msg = "이미 가입되어있는 회원입니다"
    } else {
      msg = error.sqlMessage
    }

    input.status = false;
    input.message = msg
    json_input = JSON.stringify(input);
    res.send(json_input);
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
