`use strict`

import MyRequest from "./request.js"

const login_request = new MyRequest();

var login = login || {};
login.fill_flag = false;
login.login_window_elem = document.querySelector('.login_window')
login.login_elem = document.querySelector('button.login');
login.email_elem = document.querySelector('#login_email');
login.pwd_elem = document.querySelector('#login_password');
login.progress_elem = document.querySelector('.arc-hider');

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
  login_request.logInRequest('my request')

  .then( value => {
    login.progress_elem.classList.add('hidden');
    let test = value.text().then( message => message);
    return test;
  })
  .then( value => {
    //finish progres bar
    login.Utils.progressOff();
    
    my_dialog_message.innerHTML = value;
    my_dialog.showModal();
  });
  
})



