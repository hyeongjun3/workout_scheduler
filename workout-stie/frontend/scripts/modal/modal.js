function AlertModalModel(label, description, confirm_action, cancel_action) {
  this.label = label;
  this.description = description;
  this.confirm_action = confirm_action ?? null;
  this.cancel_action = cancel_action ?? null;
}

AlertModalModel.prototype.bindSetLabel = function (callback) {
  this.setLabel = callback;
};

AlertModalModel.prototype.bindSetDesc = function (callback) {
  this.setDesc = callback;
};

AlertModalModel.prototype.setLabel = function (label) {
  this.label = label;
  this.setLabel(label);
};

AlertModalModel.prototype.setDesc = function (desc) {
  this.description = desc;
  this.setDesc(desc);
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
  this.body = this.getElement('body');

  this.dialogBackdrop = this.createElement(
    'div',
    'dialog_backdrop',
    'no_scroll',
    'hidden'
  );
  this.body.appendChild(this.dialogBackdrop);

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

AlertModalView.prototype.createElement = function (tag, ...classNameList) {
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

AlertModalView.prototype.getElement = function (selector) {
  const element = document.querySelector(selector);

  return element;
};

AlertModalView.prototype.appendChildList = function (parent, childList) {
  childList = null ?? childList;
  childList.forEach((child) => {
    parent.appendChild(child);
  });
};

AlertModalView.prototype.isOpen = function () {
  return this.dialogBackdrop.classList.contains('hidden') ? false : true;
};

AlertModalView.prototype.showModal = function () {
  this.dialogBackdrop.classList.remove('hidden');
};

AlertModalView.prototype.hideModal = function () {
  this.dialogBackdrop.classList.add('hidden');
};

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

function AlertModalController(label, description) {
  this.model = new AlertModalModel(label, description);
  this.view = new AlertModalView();

  this.view.setConfirmAction();

  /* bind function to model */
  this.model.bindSetLabel(this.view.setLabel.bind(this.view));
  this.model.bindSetDesc(this.view.setDesc.bind(this.view));

  /* Initiation */
  this.view.setLabel(this.model.label);
  this.view.setDesc(this.model.description);
}

AlertModalController.prototype.showModal = function () {
  this.view.showModal();
};

AlertModalController.prototype.hideModal = function () {
  this.view.hideModal();
};

AlertModalController.prototype.isOpen = function () {
  return this.view.isOpen();
};

AlertModalController.prototype.setModal = function (label, desc) {
  this.model.setLabel(label)
  this.model.setDesc(desc);
};

export { AlertModalController };
