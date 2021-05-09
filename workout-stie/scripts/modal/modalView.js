function ModalView() {
  this.body = this.getElement('body');

  this.dialogBackdrop = this.createElement(
    'div',
    'dialog_backdrop',
    'no_scroll',
    'hidden'
  );
  this.body.appendChild(this.dialogBackdrop);
}

ModalView.prototype.createElement = function (tag, ...classNameList) {
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

ModalView.prototype.getElement = function (selector) {
  const element = document.querySelector(selector);

  return element;
};

ModalView.prototype.appendChildList = function (parent, childList) {
  childList = null ?? childList;
  childList.forEach((child) => {
    parent.appendChild(child);
  });
};

ModalView.prototype.isOpen = function () {
  return this.dialogBackdrop.classList.contains('hidden') ? false : true;
};

ModalView.prototype.showModal = function () {
  this.dialogBackdrop.classList.remove('hidden');
};

ModalView.prototype.hideModal = function () {
  this.dialogBackdrop.classList.add('hidden');
};

ModalView.prototype.createInnerGroupInput = function (
  label,
  type,
  name,
  id,
  info
) {
  const elem = this.createElement('div', 'modal-input-field-inner-group');
  const labelElem = this.createElement('label');
  labelElem.setAttribute('for', id);
  labelElem.innerHTML = label;
  const inputElem = this.createElement('input');
  inputElem.setAttribute('type', type);
  inputElem.setAttribute('name', name);
  inputElem.setAttribute('id', id);
  const infoElem = this.createElement(
    'span',
    'modal-input-inner-info',
    'hidden'
  );
  infoElem.innerHTML = info;
  this.appendChildList(elem, [labelElem, inputElem, infoElem]);

  return elem;
};

// input = {label, type, name, id}
ModalView.prototype.createInnerGroupRadio = function (title, inputList) {
  const elem = this.createElement('div', 'modal-input-field-inner-group');
  const titleElem = this.createElement('label');
  titleElem.innerHTML = title;
  const inputRadio = this.createElement('div', 'modal-input-field-radio');
  inputList.forEach((value) => {
    const inputRadioInner = this.createElement(
      'div',
      'modal-input-field-radio-inner'
    );
    inputRadio.appendChild(inputRadioInner);
    const inputElem = this.createElement('input');
    inputElem.setAttribute('type', value.type);
    inputElem.setAttribute('name', value.name);
    inputElem.setAttribute('id', value.id);
    inputElem.setAttribute('value', value.id);
    const labelElem = this.createElement('label');
    labelElem.setAttribute('for', value.id);
    labelElem.innerHTML = value.label;
    inputRadioInner.appendChild(inputElem);
    inputRadioInner.appendChild(labelElem);
  });
  elem.appendChild(titleElem);
  elem.appendChild(inputRadio);

  return elem;
};

/*
<div class="dialog_backdrop no-scroll">
  <div
    role="alertdialog"
    aria-modal="true"
    aria-labelledby="dialog_label"
    aria-describedby="dialog_desc"
    class="alert_dialog"
  >
    <p id="dialog_label" class="dialog_label">
      에러 발생
    </p>
    <div id="dialog_desc" class="dialog_desc">
      <p>요러 요러한 에러 발생</p>
    </div>
    <div class="dialog_form_actions">
      <button type="button" id="accept">
        확인
      </button>
    </div>
  </div>
</div>
*/

function AlertModalView() {
  ModalView.call(this);
  this.alertdialog = this.createElement('div', 'alert_dialog');
  this.alertdialog.setAttribute('role', 'alertdialog');
  this.alertdialog.setAttribute('aria-modal', 'true');
  this.alertdialog.setAttribute('aria-labelledby', 'dialog_label');
  this.alertdialog.setAttribute('aria-describedby', 'dialog_desc');
  this.dialogBackdrop.appendChild(this.alertdialog);

  this.dialogLabel = this.createElement('p', 'dialog_label');
  this.dialogLabel.setAttribute('id', 'dialog_label');
  this.dialogDesc = this.createElement('div', 'dialog_desc');
  this.dialogDesc.setAttribute('id', 'dialog_desc');
  this.dialogActions = this.createElement('div', 'dialog_form_actions');
  this.appendChildList(this.alertdialog, [
    this.dialogLabel,
    this.dialogDesc,
    this.dialogActions,
  ]);
}

/* Inheritance */
AlertModalView.prototype = Object.create(ModalView.prototype);

AlertModalView.prototype.setLabel = function (msg) {
  this.dialogLabel.innerHTML = msg;
};

AlertModalView.prototype.setDesc = function (msg) {
  this.dialogDesc.innerHTML = msg;
};

AlertModalView.prototype.setConfirmAction = function () {
  this.dialogConformBtn = this.createElement('button');
  this.dialogConformBtn.innerHTML = '확인';
  this.dialogActions.appendChild(this.dialogConformBtn);

  this.dialogActions.addEventListener('click', (event) => {
    event.preventDefault();

    this.hideModal();
  });
};

/*
<div class="dialog_backdrop no_sroll">
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    class="modal-main-window"
  >
    <div class="modal-title" id="modal-title"">추가정보입력</div>
    <div class="modal-input-field">
      <div class="modal-input-field-inner-group">
        <label for="input-nickname">닉네임</label>
        <input type="text" name="nickname" id="input-nickname" />
        <span class="modal-input-field-inner-info hidden"
          >이미 존재하는 닉네임입니다.</span
        >
      </div>
      <div class="modal-input-field-inner-group">
        <label for="">성별</label>
        <div class="modal-input-field-radio">
          <div class="modal-input-field-radio-inner">
            <input type="radio" name="male" id="male" value="male" />
            <label for="male">남자</label>
          </div>
          <div class="modal-input-field-radio-inner">
            <input type="radio" name="female" id="female" value="female" />
            <label for="female">여자</label>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-btn-group">
      <button class="modal-btn-group-inner" id="btn-confirm">확인</button>
    </div>
  </div>
</div>
*/

function AdditionalModalView() {
  ModalView.call(this);

  this.modalMainWindow = this.createElement('div', 'modal-main-window');
  this.modalMainWindow.setAttribute('role', 'dialog');
  this.modalMainWindow.setAttribute('aria-modal', 'true');
  this.modalMainWindow.setAttribute('aria-labelledby', 'modal-title');
  this.dialogBackdrop.appendChild(this.modalMainWindow);

  this.modalTitle = this.createElement('div', 'modal-title');
  this.modalTitle.setAttribute('id', 'modal-title');
  this.modalTitle.innerHTML = '추가정보 입력';

  this.modalInputField = this.createElement('div', 'modal-input-field');
  this.modalNicknameField = this.createInnerGroupInput(
    '닉네임',
    'text',
    'nickname',
    'input-nickname',
    '이미 존재하는 닉네임입니다'
  );
  this.modalNicknameInput = this.modalNicknameField.querySelector('input');
  this.modalNicknameInfo = this.modalNicknameField.querySelector('span');

  this.modalGenderField = this.createInnerGroupRadio('성별', [
    { label: '남자', type: 'radio', name: 'gender', id: 'male' },
    { label: '여자', type: 'radio', name: 'gender', id: 'female' },
  ]);
  this.modalGenderRadioBtns = this.modalGenderField.querySelectorAll('input');
  this.appendChildList(this.modalInputField, [
    this.modalNicknameField,
    this.modalGenderField,
  ]);

  this.modalBtnGroup = this.createElement('div', 'modal-btn-group');
  this.modalBtnConfirm = this.createElement('button', 'modal-btn-group-inner');
  this.modalBtnConfirm.setAttribute('id', 'btn-confirm');
  this.modalBtnConfirm.innerHTML = '확인';
  this.modalBtnGroup.appendChild(this.modalBtnConfirm);

  this.appendChildList(this.modalMainWindow, [
    this.modalTitle,
    this.modalInputField,
    this.modalBtnGroup,
  ]);

  /* event handler */
  this.modalNicknameInput.addEventListener('input', (event) => {
    this.nicknameInputHandler(event.target.value);
  });

  this.modalBtnConfirm.addEventListener('click', (event) => {
    event.preventDefault();
    this.confirmBtnHandler()
    .then( (value) => {
      console.log(value)
      if(value.success == true) {
        this.hideModal();
      } else {
        /* TODO : show modal info */
      }
    })
    .catch( (err) => {
      console.error(err);
      /* TODO : show modal info */
    })
  })

  this.modalGenderField.addEventListener('click' , (event) => {
    if (event.target instanceof HTMLInputElement) {
      this.genderInputHandler(event.target.value);
    }
  })
}

AdditionalModalView.prototype = Object.create(ModalView.prototype);

/* Setter */
AdditionalModalView.prototype.setNicknameInfo = function (enable) {
  if (enable === true) {
    this.modalNicknameInfo.classList.remove('hidden');
  } else {
    this.modalNicknameInfo.classList.add('hidden');
  }
};

AdditionalModalView.prototype.setConfirmBtn = function (enable) {
  if (enable === false) {
    this.modalBtnConfirm.setAttribute('disabled', true);
  } else {
    this.modalBtnConfirm.removeAttribute('disabled');
  }
};

/* Bind */
AdditionalModalView.prototype.bindNicknameInput = function (handler) {
  this.nicknameInputHandler = handler;
};

AdditionalModalView.prototype.bindGenderInput = function (handler) {
  this.genderInputHandler = handler;
}

AdditionalModalView.prototype.bindConfirmBtn = function (handler) {
  this.confirmBtnHandler = handler;
}

export { AlertModalView, AdditionalModalView };
