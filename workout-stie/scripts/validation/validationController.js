import '../../styles/validation.css';

import { ValidationModel } from './validationModel.js';
import { ValidationView } from './validationView.js';
import {AlertModalController} from '../modal/modal.js'

function ValidationController() {
  /* modal controller */
  this.modalController = new AlertModalController() ?? null;

  /* model and view of this controller */
  this.model = new ValidationModel() ?? null;
  this.view = new ValidationView() ?? null;

  this.view.setButtonDesc('확인');

  /* create input field element list */
  this.createInputElemList(this.model.inputFieldForm);

  /* bind functions to model */
  this.model.bindSetBtn(this.view.setButton.bind(this.view));
  this.model.bindSetModal(this.modalController.setModal.bind(this.modalController));
  this.model.bindShowModal(this.modalController.showModal.bind(this.modalController));

  /* bind functions to view */
  this.view.bindCodeInput(this.model.setCode.bind(this.model));
  this.view.bindButtonClick(this.model.confirmSignUp.bind(this.model));
  this.view.bindResend(this.model.resendCode.bind(this.model));
}

ValidationController.prototype.createInputElemList = function (inputFieldForm) {
  this.view.createInputElem(inputFieldForm);
};

export { ValidationController };
