import '../../styles/modal.css';

import { AlertModalModel, AdditionalModalModel } from './modalModel.js';
import { AlertModalView, AdditionalModalView } from './modalView.js';

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
  this.model.setLabel(label);
  this.model.setDesc(desc);
};

function AdditionalModalController() {
  this.model = new AdditionalModalModel();
  this.view = new AdditionalModalView();

  /* bind functions to model */
  this.model.bindSetNicknameCallback(this.view.setNicknameInfo.bind(this.view));
  this.model.bindSetConfirmBtnCallback(this.view.setConfirmBtn.bind(this.view));

  /* bind functions to view */
  this.view.bindNicknameInput(this.model.setNickname.bind(this.model));
  this.view.bindGenderInput(this.model.setGender.bind(this.model));
  this.view.bindConfirmBtn(this.model.requestAdditional.bind(this.model));
}

AdditionalModalController.prototype.showModal = function() {
  this.view.showModal();
}

export { AlertModalController, AdditionalModalController };
