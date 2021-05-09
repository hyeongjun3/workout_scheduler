let myRequest = null;
let cognitoFlag = null;
let myExceptions = null;
let myUtils = null;

import { UserInputFieldForm } from '../user/signModel.js';

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
  });
}

function ValidationModel() {
  this.email = null;
  this.code = null;
  this.codeFlag = false;

  this.inputFieldForm = [
    new UserInputFieldForm(
      'verficationCode',
      '확인코드',
      'verficationCode',
      'input-code',
      '잘못된 형식입니다'
    ),
  ];
}

/* bind callback functions */
ValidationModel.prototype.bindSetBtn = function (callback) {
  this.setBtn = callback;
};

ValidationModel.prototype.bindSetModal = function (callback) {
  this.setModal = callback;
};

ValidationModel.prototype.bindShowModal = function (callback) {
  this.showModal = callback;
};

/* setter */
ValidationModel.prototype.setValue = function (index, value) {
  this.inputFieldForm[index].value = value;
};

ValidationModel.prototype.setCode = function (codeInput) {
  this.setValue(0, codeInput);

  this.codeFlag = true;

  this.checkValidForm();
};

/* others */
ValidationModel.prototype.checkValidForm = function () {
  if (this.codeFlag === true) {
    this.setBtn(true);
  } else {
    this.setBtn(false);
  }
};

ValidationModel.prototype.confirmSignUp = function () {
  this.email = myUtils.getUser().email ?? null;
  this.code = this.inputFieldForm[0].value;

  return myRequest
    .confirmSignUp(this.email, this.code)
    .then(() => {
      let ret = {redirectionURL : 'signIn.html'};
      return ret;
    })
    .catch((err) => {
      console.error(err);
      this.setModal('에러발생', err.message);
      this.showModal();
      return;
    });
};

ValidationModel.prototype.resendCode = function () {
  this.email = myUtils.getUser().email ?? null;

  return myRequest
    .resendCode(this.email)
    .then((result) => {
      this.setModal('코드 전송', '확인코드 전송하였습니다');
      this.showModal();
      console.log(result);
    })
    .catch((err) => {
      console.error(err);
      this.setModal('에러발생', err.message);
      this.showModal();
    });
};

export { ValidationModel };
