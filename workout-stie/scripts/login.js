`use strict`

import MyRequest from "./request.js"
import { MyDialogOne } from "./mydialog.js"

const login_request = new MyRequest();

var login = login || {};
login.fill_flag = false;
login.access_token = "";
login.login_window_elem = document.querySelector('.login_window')
login.login_elem = document.querySelector('button.login');
login.email_elem = document.querySelector('#login_email');
login.pwd_elem = document.querySelector('#login_password');
login.progress_elem = document.querySelector('.arc-hider');

let my_dialog = new MyDialogOne(document,"default", "확인")
my_dialog.setUI();

login.Utils = login.Utils || {};

login.Utils.validateEmail = function(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

login.Utils.changeStateLogin = function(activate) {
  console.log("changeStateLogin ",activate)
  if(activate === true) {
    login.login_elem.removeAttribute("disabled");
  } else {
    login.login_elem.setAttribute("disabled","");
  }
}

login.Utils.checkFill = function() {
  let email_value = login.email_elem.value;
  let pwd_value = login.pwd_elem.value;
  
  if (login.Utils.validateEmail(email_value) === true && pwd_value.length !== 0) {
    console.log("Filled!");
    login.fill_flag = true;
    login.Utils.changeStateLogin(true);
  } else {
    login.fill_flag = false;
    login.Utils.changeStateLogin(false);
  }
}

login.Utils.progressOn = function() {
  login.login_window_elem.classList.add('transparent')
  login.progress_elem.classList.remove('hidden');
}

login.Utils.progressOff = function() {
  login.progress_elem.classList.add('hidden');
  login.login_window_elem.classList.remove('transparent')
}

login.email_elem.addEventListener('input', event => {
  login.Utils.checkFill();
})

login.pwd_elem.addEventListener('input', event => {
  login.Utils.checkFill();
})

login.login_elem.addEventListener('click', event => {
  console.log('Clicked!');
  
  //start progress bar
  login.Utils.progressOn();
  let input = {}
  input.email = login.email_elem.value;
  input.pwd = login.pwd_elem.value
  login_request.logInRequest(input)
  .then( value => {
    login.progress_elem.classList.add('hidden');
    return value;
  })
  .then( value => {
    //finish progres bar
    login.Utils.progressOff();

    console.log(value);

    window.sessionStorage.setItem('access_token',value.access_token)

    if (value.status === false) {
      my_dialog.setMessage(value.message);
      my_dialog.showModal();
      return;
    }

    if (value.validation_flag === false) {
      window.location.href = "validation.html";
      return;
    }

    // TODO : why too slow when i use other type except string
    if (value.additional_flag === false) {
      window.sessionStorage.setItem('additional_flag', 'false');
      window.location.href = "daily.html";
      return;
    }

    // Success
    window.sessionStorage.setItem('additional_flag','true');
    window.location.href = "daily.html";
  })
  .catch (error => {
    console.log(error);
  });
  
})



