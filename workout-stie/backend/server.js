
const mySql = require('./mysql')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const { nextTick } = require('process');
const app = express();

var corsOptions = {
  origin: 'http://127.0.0.1:5500',
  allowedHeaders : ['Content-Type', 'Set-cookies'],
  credentials : true,
}

app.use(cors(corsOptions))
app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(cookieParser());
const port = 3000;

const cookie_storage = {}

class Cookie{
  constructor(user) {
    this.user = user;
  }

  static makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  } 

  // 이미 accesstoken이 있는지 확인
  static generateAccessToken(user_email) {
    let ret = this.makeid(10);

    while (cookie_storage.hasOwnProperty(ret)) {
      ret = makeid(10);
    }

    cookie_storage[ret] = new Cookie(user_email)

    return ret;
  }
}

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
    let json_input = {}
    let access_token = "";

    console.log(req.cookies)
    res.set({'Content-type' : 'application/json'})

    let options = {
      // maxAge: 1000 * 60 * 15, // would expire after 15 minutes
      // httpOnly: true, // The cookie only accessible by the web server
      // signed: true // Indicates if the cookie should be signed
      path : '/',
    } 
  
    if (results.length === 0) {
      input.status = false;
      input.message = "이메일 또는 비밀번호를 확인하세요";
    } else {
      input.status = true;
      input.message = "성공"
      access_token = Cookie.generateAccessToken(req.body.email)
      res.cookie('access_token', access_token,options);
      // res.redirect('/');
    }
  
    json_input = JSON.stringify(input);
    res.send(json_input)
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