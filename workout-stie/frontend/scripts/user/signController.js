import {SignInModel, SignUpModel} from './signModel.js'
import {SignInView, SignView} from './signView.js';
import {AlertModalController} from '../modal/modal.js'

function SignUpController() {
  /* modal controller */
  this.modalController = new AlertModalController() ?? null;

  /* model and view of this controller */
  this.model = new SignUpModel() ?? null;
  this.view = new SignView() ?? null;
  this.view.setButtonDesc('회원가입');

  /* create input field element list */
  this.createInputElemList(this.model.inputFieldForm);

  /* bind functions to model */
  this.model.bindSetEmailAlert(this.view.setEmailInfo.bind(this.view));
  this.model.bindSetPwdAlert(this.view.setPwd2Info.bind(this.view));
  this.model.bindSetBtn(this.view.setButton.bind(this.view));
  this.model.bindSetModal(this.modalController.setModal.bind(this.modalController));
  this.model.bindShowModal(this.modalController.showModal.bind(this.modalController));

  /* bind functions to view */
  this.view.bindEmailInput(this.model.setEmail.bind(this.model));
  this.view.bindPwdInput(this.model.setPwd.bind(this.model));
  this.view.bindPwd2Input(this.model.setPwd2.bind(this.model));
  this.view.bindButtonClick(this.model.signUp.bind(this.model));
}

SignUpController.prototype.createInputElemList = function (inputFieldForm) {
  this.view.createInputElem(inputFieldForm);
};

SignUpController.prototype.isOpen = function () {
  return this.modalController.isOpen();
}

SignUpController.prototype.hideModal = function() {
  this.modalController.hideModal();
}

function SignInController() {
  /* modal controller */
  this.modalController = new AlertModalController() ?? null;

  /* model and view of this controller */
  this.model = new SignInModel() ?? null;
  this.view = new SignInView() ?? null;
  this.view.setButtonDesc('로그인');

  /* create input field element list */
  this.createInputElemList(this.model.inputFieldForm);

  /* bind functions to model */
  this.model.bindSetEmailAlert(this.view.setEmailInfo.bind(this.view));
  this.model.bindSetBtn(this.view.setButton.bind(this.view));
  this.model.bindSetModal(this.modalController.setModal.bind(this.modalController));
  this.model.bindShowModal(this.modalController.showModal.bind(this.modalController));

  /* bind functions to view */
  this.view.bindEmailInput(this.model.setEmail.bind(this.model));
  this.view.bindPwdInput(this.model.setPwd.bind(this.model));
  this.view.bindButtonClick(this.model.signIn.bind(this.model));
}

SignInController.prototype.createInputElemList = function (inputFieldForm) {
  this.view.createInputElem(inputFieldForm);
};

SignInController.prototype.isOpen = function () {
  return this.modalController.isOpen();
}

SignInController.prototype.hideModal = function() {
  this.modalController.hideModal();
}

export {SignInController, SignUpController};