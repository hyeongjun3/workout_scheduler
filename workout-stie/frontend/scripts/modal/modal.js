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
}

AdditionalModalController.prototype.showModal = function() {
  this.view.showModal();
}

export { AlertModalController, AdditionalModalController };
