import '../../image/logo.png';
import '../../styles/user.css'

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
    <button class="user-btn-group-inner">로그인</button>
  </div>
</div>
*/

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
  this.userBtnGroupInner.setAttribute('data-testid', 'test-btn');
  this.userBtnGroupInner.setAttribute('disabled', '');
  this.userBtnGroup.appendChild(this.userBtnGroupInner);

  this.appendChildList(this.userMainWindow, [
    this.userLogo,
    this.userInputField,
    this.userBtnGroup,
  ]);

  this.body.appendChild(this.userMainWindow);
}

SignView.prototype.createElement = function (tag, ...classNameList) {
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
    inputElem.setAttribute('data-testid', 'test-' + value.nameEng);
    const spanElem = this.createElement(
      'span',
      'user-input-field-inner-info',
      'hidden'
    );
    spanElem.innerHTML = value.infoStr;
    spanElem.setAttribute('data-testid', 'test-info-' + value.nameEng);
    this.appendChildList(groupElem, [labelElem, inputElem, spanElem]);

    this.userInputField.appendChild(groupElem);
    this.userInputFieldGroup[value.inputId] = { inputElem, spanElem };
  });
};

SignView.prototype.setButtonDesc = function(desc) {
    this.userBtnGroupInner.innerHTML = desc;
}

SignView.prototype.setButton = function (enable) {
  if (enable === true) {
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
      if(result.hasOwnProperty('redirectionURL')) {
        window.location.href = result.redirectionURL;
      }
    })
  });
};

function SignInView() {
    SignView.call(this);

    this.userSignUpA = this.createElement('a', 'user-signup-a');
    this.userSignUpA.innerHTML = '회원가입?';
    this.userMainWindow.appendChild(this.userSignUpA);

    this.userSignUpA.addEventListener('click', () => {
        window.location.href = 'signUp.html';
    })
}

SignInView.prototype = Object.create(SignView.prototype);

export {SignView, SignInView};