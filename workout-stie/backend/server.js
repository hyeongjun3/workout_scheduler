// myfile
const mail = require('./mail')
const mySql = require('./mysql')

// outside module
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
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

  static options = {
    maxAge: 1000 * 60 * 0.1, // would expire after 30 minutes
    // httpOnly: true, // The cookie only accessible by the web server
    // signed: true // Indicates if the cookie should be signed
    path : '/',
    sameSite : 'None',
    secure : true,
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

  // TODO : 없을 때 처리
  static getUserEmailByAccessToken(access_token) {
    let cookie = cookie_storage[access_token]
    if (cookie === undefined || cookie.hasOwnProperty('user') === false) {
      return false;
    } else {
      return cookie.user;
    }
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

    res.set({'Content-type' : 'application/json'})

    if (results.length === 0) {
      input.status = false;
      input.message = "이메일 또는 비밀번호를 확인하세요";
    } else {
      input.status = true;
      input.message = "성공"
      input.nickname = results[0].nickname;
      input.gender = results[0].gender;
      input.additional_flag = results[0].additional_flag === 0 ? false : true;
      input.validation_flag = results[0].validation_flag === 0 ? false : true;

      access_token = Cookie.generateAccessToken(req.body.email)
      console.log(`ACCESS TOKEN : ${access_token}`);
      res.cookie('access_token', access_token, Cookie.options);

      // 나중에 serverless AWS 이용하면 없앨 것
      input.access_token = access_token;
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
  let verification_code = Cookie.makeid(10);
  let json_input = undefined;

  console.log('code : ',verification_code)

  res.set({'Content-Type' : 'application/json'});

  mySql.Utils.createUser(req.body.email, req.body.pwd,verification_code)
  .then( results => {
    console.log(results)
    input.status = true;
    input.message = "Success to sign up";
    json_input = JSON.stringify(input);
    mail.sendMail(req.body.email, verification_code).then(() => {
      res.send(json_input)
    }).catch(error => {
      throw error;
    })
    // res.send(json_input);
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
    res.status(400).send(json_input);
  })
})

app.post('/logout', (req,res) => {
  console.log('LogOut requested');

  let access_token = req.body.access_token === undefined ?
                     req.cookies.access_token : req.body.access_token;
  let input = {}
  let json_input = {}

  if (cookie_storage.hasOwnProperty(access_token)) {
    input.status = true;
    input.message = "Success to log out";
    delete cookie_storage[access_token];
  } else {
    input.status = false;
    input.message = "Fail to log out"
  }

  json_input = JSON.stringify(input);
  res.send(json_input);
})

app.post('/addAdditionalInfo', (req,res) => {
  console.log('addAdditionalInfo requested');

  // TODO : should update
  let user_email = req.body.access_token === undefined ?
                  Cookie.getUserEmailByAccessToken(req.cookies.access_token) :
                  Cookie.getUserEmailByAccessToken(req.body.access_token);
  let input = {};

  if (user_email === false) {
    input.status = false;
    input.message = "Invalid access token";
    json_input = JSON.stringify(input);
    res.send(json_input);
    return;
  }
 
  mySql.Utils.addAdditionalInfo(user_email,req.body.nickname,req.body.gender)
  .then( result => {
    input.status = true;
    input.message = "성공"
    json_input = JSON.stringify(input);
    res.send(json_input);
  })
  .catch (error => {
    console.log(error);
    input.status = false;
    if (error.errno === 1062) {
      input.message = "이미 있는 닉네임입니다."
    } else {
      input.message = error.sqlMessage
    }

    json_input = JSON.stringify(input);
    res.send(json_input);
  })
})

app.post('/getEmailByAccessToken', (req,res) => {
  console.log('getEmailByAccessToken requested');

  // Cookie or session mechanism 
  // let user_email = Cookie.getUserEmailByAccessToken(req.cookies.access_token);
  let user_email = req.body.access_token === undefined ?
                  Cookie.getUserEmailByAccessToken(req.cookies.access_token) :
                  Cookie.getUserEmailByAccessToken(req.body.access_token);
  let input = {}

  if (user_email === false) {
    input.status = false;
    input.message = "Invalid access token";
  } else {
    input.status =true;
    input.email = user_email;
  }

  json_input = JSON.stringify(input);
  res.send(json_input);
})

app.post('/verification', (req,res) => {
  console.log('Verification requests')
  let code = req.body.code;
  let input = {};
  
  mySql.Utils.checkVerificationCode(code)
  .then(value => {
    if (value.length === 0) {
      input.status = false;
      input.message = "Check verification code";
      let json_input = JSON.stringify(input);
      res.send(json_input);
    } else {
      mySql.Utils.updateValidationFlag(code)
      .then(value => {
        input.status = true;
        input.message = "success to verification"
        let json_input = JSON.stringify(input);
        res.send(json_input);
      })
      .catch(err => {
        console.log(err);
      });
    }
  })
  .catch(err => {
    
    console.log(err);
  })
})

app.post('/getUserInfo', (req,res) => {
  console.log(`Request Recieve`);

  let user_email = Cookie.getUserEmailByAccessToken(req.body.access_token);

  mySql.Utils.readUserInfo(user_email)
  .then ( results => {
    let input = {}
    let json_input = {}

    res.set({'Content-type' : 'application/json'})

    if (results.length === 0) {
      input.status = false;
      input.message = "이메일를 확인하세요";
      json_input = JSON.stringify(input);
      res.status(400).send(json_input)
    } else {
      input.status = true;
      input.message = "성공"
      input.nickname = results[0].nickname;
      input.gender = results[0].gender;
      json_input = JSON.stringify(input);
      res.send(json_input)
    }
  })
  .catch (error => {
    input.status = false;
    input.message = error;
    json_input = JSON.stringify(input);
    res.status(400).send(json_input);
  })
});

app.post('/deleteUser', (req,res) => {
  console.log(`Request Recieve`);

  let user_email = Cookie.getUserEmailByAccessToken(req.body.access_token);

  mySql.Utils.deleteUser(user_email)
  .then ( results => {
    let input = {}
    let json_input = {}

    res.set({'Content-type' : 'application/json'})

    if (results.length === 0) {
      input.status = false;
      input.message = "이메일를 확인하세요";
      json_input = JSON.stringify(input);
      res.status(400).send(json_input)
    } else {
      input.status = true;
      input.message = "성공"
      json_input = JSON.stringify(input);
      res.send(json_input)
    }
  })
  .catch (error => {
    input.status = false;
    input.message = error;
    json_input = JSON.stringify(input);
    res.status(400).send(json_input);
  })
});

function MyDate(date,weight,class_name) {
  this.date = date;
  this.weight = weight;
  this.class_name = class_name;
}

let date_num = ['-1','31','28','31','30','31','30',
                     '31','31','30','31','30','31'];

function getCalender(target_time, daily_info) {
  let ret = [];
  let target_year = parseInt(target_time[0]);
  let target_month = parseInt(target_time[1]);
  let target_date = parseInt(target_time[2]);
  let new_target_time = new Date(target_year,target_month-1,1,10)
  new_target_time.toLocaleString('ko-KR', {timeZone : 'Asia/Seoul'})
  
  let prev_month = target_month - 1;
  prev_month = prev_month === 0 ? 12 : prev_month;

  let next_month = target_month + 1;
  next_month = next_month === 13 ? 1 : next_month;

  /* check leap year*/
  if (target_year%4 === 0) {
    if (target_year%100 === 0) {
      if(target_year%400 === 0) {
        date_num[2] = 29;
      } 
    } else {
      date_num[2] = 29;
    }
  }

  /* get current date */
  let target_day = new_target_time.getDay();
  let prev_date_start = date_num[prev_month] - target_day + 1;

  /* push previous month date */
  for (let i=0; i<target_day; i++, prev_date_start++) {
    ret.push(new MyDate(prev_date_start,null,'prev_month'));
  }

  let user_daily_index = 0;
  /* push current month date */
  for (let i=0; i<date_num[target_month]; i++) {
    let input_date = i+1;
    let input_daily_data = new MyDate(i+1, null, 'current_month');
    if (user_daily_index < daily_info.length) {
      let value = daily_info[user_daily_index]
      let target_date =  parseInt(JSON.stringify(value.date).split('-')[2].substr(0,2));
      if (input_date === target_date) {
        input_daily_data.weight = value.weight;
        user_daily_index += 1;
      }
    }
    ret.push(input_daily_data);
  }

  let remain_date_num = 7 - ret.length%7;
  for (let i=0; i<remain_date_num; i++) {
    ret.push(new MyDate(i+1,null,'next_month'));
  }
  
  return ret;
}

app.post('/createDaily', (req,res) => {
  let input = {};
  let json_input = {}

  let user_email = Cookie.getUserEmailByAccessToken(req.body.access_token);
  let weight = req.body.weight;
  let target_time = req.body.target_time;

  res.set({'Content-type' : 'application/json'})

  mySql.Utils.createDaily(user_email, weight, target_time)
  .then ( results => {
    input.status = true;
    input.message = "성공"
    json_input = JSON.stringify(input);
    res.send(json_input)
  })
  .catch (error => {
    input.status = false;
    input.message = error;
    json_input = JSON.stringify(input);
    res.status(400).send(json_input);
  })
})

app.post('/getDailyInfo', (req,res) => {
  console.log(req.body);
  let input = {}
  let json_input = {}

  let user_email = Cookie.getUserEmailByAccessToken(req.body.access_token);
  let target_time = req.body.target_time.split('-');
  
  res.set({'Content-type' : 'application/json'})

  mySql.Utils.getDailyInfo(user_email, target_time[0], target_time[1])
  .then(results => {
    let temp_calender_info = getCalender(target_time, results);
    input.status = true;
    input.calender_daily = temp_calender_info;
    json_input = JSON.stringify(input);
    res.send(json_input)
  })
  .catch(err => {
    input.status = false;
    input.message = error;
    json_input = JSON.stringify(input);
    res.status(400).send(json_input);
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});