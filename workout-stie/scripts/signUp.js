import MyRequest from "./request.js"

let signUp = {}
const signUp_request = new MyRequest();

// TODO: check pwd1 pwd2
signUp.Utils = {}
signUp.Utils.validateEmail = function() {
  let email = signUp.email_elem.value;
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

signUp.Utils.checkFill = function() {
  let email_value = signUp.email_elem.value;
  let pwd_value = signUp.pwd_elem.value;
  let pwd2_value = signUp.pwd2_elem.value;

  if (email_value.length !== 0 &&
      pwd_value.length !== 0 &&
      pwd2_value.length !== 0 ) {
    signUp.btn_elem.removeAttribute('disabled');
  } else {
    signUp.btn_elem.setAttribute('disabled','');
  }
}

signUp.Utils.checkEqualPwd = function() {
  let ret = false;
  let pwd_value = signUp.pwd_elem.value;
  let pwd2_value = signUp.pwd2_elem.value;
  
  if (pwd_value !== pwd2_value) {
    ret = false;
  } else {
    ret = true;
  }

  return ret;
}

signUp.email_elem = document.querySelector('#email');
signUp.pwd_elem = document.querySelector('#password');
signUp.pwd2_elem = document.querySelector('#password2');
signUp.btn_elem = document.querySelector('button.signUp_button');

signUp.email_elem.addEventListener('input', event => {
  signUp.Utils.checkFill()
})

signUp.pwd_elem.addEventListener('input', event => {
  signUp.Utils.checkFill()
})

signUp.pwd2_elem.addEventListener('input', event => {
  signUp.Utils.checkFill()
})

signUp.btn_elem.addEventListener('click', event => {
  if (signUp.Utils.validateEmail() === false) {
    console.log('Email error');
    my_dialog_message.innerHTML = 'Email error';
    my_dialog.showModal();
    return;
  }
  else if(signUp.Utils.checkEqualPwd() === false) {
    console.log('Password error');
    my_dialog_message.innerHTML = 'Password error';
    my_dialog.showModal();
    return;
  }

  // TODO after successing signup, login and route to dailyt page
  // Interact with server
  let input = {};
  input.email = signUp.email_elem.value;
  input.pwd = signUp.pwd_elem.value;
  signUp.Utils.progressOn();
  signUp_request.SignUpRequest(input)
  .then( result => {
    signUp.Utils.progressOff();
    window.location.href = "daily.html";
  })
  .catch (error => {
    signUp.Utils.progressOff();
    my_dialog_message.innerHTML = error;
    my_dialog.showModal();
  });
})


//progress bar
signUp.signUp_window = document.querySelector('.signUp_window')
signUp.progress_elem = document.querySelector('.arc-hider');

signUp.Utils.progressOn = function() {
  signUp.signUp_window.classList.add('transparent')
  signUp.progress_elem.classList.remove('hidden');
}

signUp.Utils.progressOff = function() {
  signUp.progress_elem.classList.add('hidden');
  signUp.signUp_window.classList.remove('transparent')
}