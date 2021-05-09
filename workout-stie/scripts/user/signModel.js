let myRequest = null;
let cognitoFlag = null;
let myExceptions = null;
let myUtils = null;

/* Checking window object if it has my request module */
if (window.hasOwnProperty('myRequest') === false) {
  import('../request.js').then((module) => {
    myRequest = module.MyRequest;
    cognitoFlag = module.cognitoFlag;
    myExceptions = module.myExceptions;
  });
}

if (window.hasOwnProperty('myUtils') === false) {
  import('../utils.js').then((module) => {
    myUtils = module.Utils;
  })
}

function UserInputFieldForm(type, nameKor, nameEng, inputId, infoStr) {
  this.type = type;
  this.nameKor = nameKor;
  this.nameEng = nameEng;
  this.inputId = inputId;
  this.infoStr = infoStr;
  this.value = null;
}

function SignModel() {
  this.email = null;
  this.pwd = null;
}

SignModel.prototype.bindSetEmailAlert = function (callback) {
  this.setEmailAlert = callback;
};

SignModel.prototype.bindSetBtn = function (callback) {
  this.setBtn = callback;
};

SignModel.prototype.bindSetModal = function (callback) {
  this.setModal = callback;
};

SignModel.prototype.bindShowModal = function (callback) {
  this.showModal = callback;
};

SignModel.prototype.setValue = function (index, value) {
  this.inputFieldForm[index].value = value;
};

SignModel.prototype.checkValidForm = function () {
  if (this.emailFlag === true && this.pwdFlag === true) {
    this.setBtn(true);
  } else {
    this.setBtn(false);
  }
};

SignModel.prototype.setEmail = function (emailInput) {
  this.setValue(0, emailInput);

  if (this.validateEmail(emailInput)) {
    this.setEmailAlert(false);
    this.emailFlag = true;
  } else {
    this.setEmailAlert(true);
    this.emailFlag = false;
  }

  this.checkValidForm();
};

SignModel.prototype.setPwd = function (pwdInput) {
  this.setValue(1, pwdInput);

  this.pwdFlag = true;

  this.checkValidForm();
};

SignModel.prototype.validateEmail = function (email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

function SignInModel() {
  SignModel.call(this);
  this.inputFieldForm = [
    new UserInputFieldForm(
      'email',
      '이메일',
      'email',
      'input-email',
      '잘못된 형식입니다.'
    ),
    new UserInputFieldForm('password', '비밀번호', 'pwd', 'input-pwd', ''),
  ];
}

SignInModel.prototype = Object.create(SignModel.prototype);

/* Call back functions that will be invoked by View */
SignInModel.prototype.signIn = function () {
  this.email = this.inputFieldForm[0].value;
  this.pwd = this.inputFieldForm[1].value;

  return myRequest
    .signIn(this.email, this.pwd)
    .then((result) => {
      /* TODO : should store the user data to client session */
      /* TODO : should be implement after rest api is implemented */
      let ret = {};
      console.log(result);
      // ret.redirectionURL = 'daily.html';
      return ret;
    })
    .catch((err) => {
      let ret = {};
      if (myExceptions.hasOwnProperty(err.code)) {
        const user = myUtils.getUser();
        user.email = this.email;
        myUtils.setUser(user);
        ret.redirectionURL = 'validation.html';
      } else {
        console.error(err);
        this.setModal('에러발생', err.message);
        this.showModal();
      }
      return ret;
    });
};

function SignUpModel() {
  SignModel.call(this);
  this.emailFlag = false;
  this.pwdFlag = false;
  /* Use array because of order */
  this.inputFieldForm = [
    new UserInputFieldForm(
      'email',
      '이메일',
      'email',
      'input-email',
      '잘못된 형식입니다'
    ),
    new UserInputFieldForm('password', '비밀번호', 'pwd', 'input-pwd', ''),
    new UserInputFieldForm(
      'password',
      '비밀번호 확인',
      'pwd2',
      'input-pwd2',
      '비밀번호가 일치하지 않습니다'
    ),
  ];
}

SignUpModel.prototype = Object.create(SignModel.prototype);

SignUpModel.prototype.bindSetPwdAlert = function (callback) {
  this.setPwdAlert = callback;
};

SignUpModel.prototype.bindHideModal = function (callback) {
  this.hideModal = callback;
};

SignUpModel.prototype.checkValidForm = function () {
  if (this.emailFlag === true && this.pwdFlag === true) {
    this.setBtn(true);
  } else {
    this.setBtn(false);
  }
};

SignUpModel.prototype.setPwd2 = function (pwd2Input) {
  this.setValue(2, pwd2Input);

  if (this.inputFieldForm[1].value === this.inputFieldForm[2].value) {
    this.setPwdAlert(false);
    this.pwdFlag = true;
  } else {
    this.setPwdAlert(true);
    this.pwdFlag = false;
  }

  this.checkValidForm();
};

SignUpModel.prototype.signUp = function () {
  this.email = this.inputFieldForm[0].value;
  this.pwd = this.inputFieldForm[1].value;

  return myRequest
    .signUp(this.email, this.pwd)
    .then(() => {
      const user = myUtils.getUser();
      let ret = {};
      user.email = this.email;
      myUtils.setUser(user);
      ret.redirectionURL = 'validation.html';
      return ret;
    })
    .catch((err) => {
      console.error(err);
      this.setModal(err.name, err.message);
      this.showModal();
      return;
    });
};

export { UserInputFieldForm, SignInModel, SignUpModel };
