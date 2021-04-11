/* Checking window object if it has my request module */
if (window.hasOwnProperty('myRequest') === false) {
  import('./request.js').then((module) => {
    const myRequest = module.MyRequest;
    window.myRequest = myRequest;
  });
}

function UserInputFieldForm(type, nameKor, nameEng, inputId, infoStr) {
  this.type = type;
  this.nameKor = nameKor;
  this.nameEng = nameEng;
  this.inputId = inputId;
  this.infoStr = infoStr;
  this.value = null;
}

function SignUpModel() {
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
    new UserInputFieldForm(
      'password',
      '비밀번호',
      'pwd',
      'input-pwd',
      ''),
    new UserInputFieldForm(
      'password',
      '비밀번호 확인',
      'pwd2',
      'input-pwd2',
      '비밀번호가 일치하지 않습니다'
    ),
  ];
}

SignUpModel.prototype.validateEmail = function (email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

SignUpModel.prototype.bindSetEmailAlert = function (callback) {
  this.setEmailAlert = callback;
};

SignUpModel.prototype.bindSetPwdAlert = function (callback) {
  this.setPwdAlert = callback;
};

SignUpModel.prototype.bindSetBtn = function (callback) {
  this.setBtn = callback;
};

SignUpModel.prototype.checkValidForm = function () {
  if (this.emailFlag === true && this.pwdFlag === true) {
    this.setBtn(true);
  } else {
    this.setBtn(false);
  }
};

SignUpModel.prototype.setValue = function (index, value) {
  this.inputFieldForm[index].value = value;
};

SignUpModel.prototype.setEmail = function (emailInput) {
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

SignUpModel.prototype.setPwd = function (pwdInput) {
  this.setValue(1, pwdInput);

  if (this.inputFieldForm[1].value === this.inputFieldForm[2].value) {
    this.setPwdAlert(false);
    this.pwdFlag = true;
  } else {
    this.setPwdAlert(true);
    this.pwdFlag = false;
  }

  this.checkValidForm();
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
  const email = this.inputFieldForm[0].value;
  const pwd = this.inputFieldForm[1].value;

  return window.myRequest.signUp(email, pwd);
};

{
  /*
<div class="user-main-window">
  <div class="user-logo">
    <img src="../image/logo.png" alt="logo">
  </div>
  <div class="user-input-field">
    <div class="user-input-field-inner-group">
      <label for="input-email">이메일</label>
      <input type="email" name="email" id="input-email" />
      <span class="user-input-field-inner-info">잘못된 형식입니다</span>
    </div>
    <div class="user-input-field-inner-group">
      <label for="input-pwd">비밀번호</label>
      <input type="password" name="pwd" id="input-pwd" />
      <span class="user-input-field-inner-info hidden"></span>
    </div>
    <div class="user-input-field-inner-group">
      <label for="input-pwd2">비밀번호 확인</label>
      <input type="password" name="pwd2" id="input-pwd2" />
      <span class="user-input-field-inner-info hidden">비밀번호가 일치하지 않습니다.</span>
    </div>
  </div>
  <div class="user-btn-group">
    <button class="user-btn-group-inner" id="btn-login">로그인</button>
  </div>
</div>
*/
}

function SignView() {
  this.body = this.getElement('body');

  this.userMainWindow = this.createElement('div', 'user-main-window');
  this.userLogo = this.createElement('div', 'user-logo');
  this.userLogoImg = this.createElement('img');
  this.userLogoImg.setAttribute('src', '../image/logo.png');
  this.userLogoImg.setAttribute('alt', 'logo');
  this.userLogo.appendChild(this.userLogoImg);

  this.userInputField = this.createElement('div', 'user-input-field');
  this.userInputFieldGroup = [];

  this.userBtnGroup = this.createElement('div', 'user-btn-group');
  this.userBtnGroupInner = this.createElement('button', 'user-btn-group-inner');
  this.userBtnGroupInner.setAttribute('id', 'btn-login');
  this.userBtnGroupInner.setAttribute('disabled', '');
  this.userBtnGroupInner.innerHTML = '로그인';
  this.userBtnGroup.appendChild(this.userBtnGroupInner);

  this.appendChildList(this.userMainWindow, [
    this.userLogo,
    this.userInputField,
    this.userBtnGroup,
  ]);

  this.body.appendChild(this.userMainWindow);
}

SignView.prototype.createElement = function (tag, ...classNameList) {
  console.debug(
    `[createElement]
                  tag : ${tag}, 
                  classNameList : ${classNameList}`.replace(/\n\s+/g, '')
  );

  const element = document.createElement(tag);
  classNameList = null ?? classNameList;
  classNameList.forEach((className) => {
    element.classList.add(className);
  });

  return element;
};

SignView.prototype.getElement = function (selector) {
  const element = document.querySelector(selector);

  return element;
};

SignView.prototype.appendChildList = function (parent, childList) {
  childList = null ?? childList;
  childList.forEach((child) => {
    parent.appendChild(child);
  });
};

SignView.prototype.createInputElem = function (inputFieldFormList) {
  inputFieldFormList.forEach((value) => {
    const groupElem = this.createElement('div', 'user-input-field-inner-group');
    const labelElem = this.createElement('label');
    labelElem.setAttribute('for', value.inputId);
    labelElem.innerHTML = value.nameKor;
    const inputElem = this.createElement('input');
    inputElem.setAttribute('type', value.type);
    inputElem.setAttribute('name', value.nameEng);
    inputElem.setAttribute('id', value.inputId);
    const spanElem = this.createElement(
      'class',
      'user-input-field-inner-info',
      'hidden'
    );
    spanElem.innerHTML = value.infoStr;
    this.appendChildList(groupElem, [labelElem, inputElem, spanElem]);

    this.userInputField.appendChild(groupElem);
    this.userInputFieldGroup[value.inputId] = { inputElem, spanElem };
  });
};

SignView.prototype.setButton = function (enable) {
  if (enable === true) {
    console.log('remove!!');
    this.userBtnGroupInner.removeAttribute('disabled');
  } else {
    this.userBtnGroupInner.setAttribute('disabled', '');
  }
};

SignView.prototype.getEmail = function () {
  const emailInputElem = this.userInputFieldGroup['input-email'].inputElem;
  return emailInputElem.value;
};

SignView.prototype.setEmailInfo = function (enable) {
  const elem = this.userInputFieldGroup['input-email'].spanElem;
  if (enable === true) {
    elem.classList.remove('hidden');
  } else {
    elem.classList.add('hidden');
  }
};

SignView.prototype.getPwd = function () {
  const pwdInputElem = this.userInputFieldGroup['input-pwd'].inputElem;
  return pwdInputElem.value;
};

SignView.prototype.getPwd2 = function () {
  const pwdInputElem2 = this.userInputFieldGroup['input-pwd2'].inputElem;
  return pwdInputElem2.value;
};

SignView.prototype.setPwd2Info = function (enable) {
  const elem = this.userInputFieldGroup['input-pwd2'].spanElem;
  if (enable === true) {
    elem.classList.remove('hidden');
  } else {
    elem.classList.add('hidden');
  }
};

SignView.prototype.bindEmailInput = function (handler) {
  const emailInputElem = this.userInputFieldGroup['input-email'].inputElem;
  emailInputElem.addEventListener('input', () => {
    handler(emailInputElem.value);
  });
};

SignView.prototype.bindPwdInput = function (handler) {
  const pwdInputElem = this.userInputFieldGroup['input-pwd'].inputElem;
  pwdInputElem.addEventListener('input', () => {
    handler(pwdInputElem.value);
  });
};

SignView.prototype.bindPwd2Input = function (handler) {
  const pwd2InputElem = this.userInputFieldGroup['input-pwd2'].inputElem;
  pwd2InputElem.addEventListener('input', () => {
    handler(pwd2InputElem.value);
  });
};

SignView.prototype.bindButtonClick = function (handler) {
  const btnElem = this.userBtnGroupInner;
  btnElem.addEventListener('click', (event) => {
    event.preventDefault();

    handler()
      .then((result) => {
        if (result.success == 'true') {
          window.location.href = 'daily.html';
        } else {
          /* something alert message */
        }
      })
      .catch((err) => {
        /* Something alert message */
      });
  });
};

function SignController(model, view) {
  this.model = model;
  this.view = view;

  /* create input field element list */
  this.createInputElemList(this.model.inputFieldForm);

  /* bind functions to model */
  this.model.bindSetEmailAlert(this.view.setEmailInfo.bind(this.view));
  this.model.bindSetPwdAlert(this.view.setPwd2Info.bind(this.view));
  this.model.bindSetBtn(this.view.setButton.bind(this.view));

  /* bind functions to view */ this.view.bindEmailInput(
    this.model.setEmail.bind(this.model)
  );
  this.view.bindPwdInput(this.model.setPwd.bind(this.model));
  this.view.bindPwd2Input(this.model.setPwd2.bind(this.model));
}

SignController.prototype.createInputElemList = function (inputFieldForm) {
  this.view.createInputElem(inputFieldForm);
};

const signUpController = new SignController(new SignUpModel(), new SignView());