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

function AdditionalModalModel() {
  this.nickname = null;
  this.gender = null;
}

/* Setter */
AdditionalModalModel.prototype.setNickname = function(nickname) {
  this.nickname = nickname;
}

AdditionalModalModel.prototype.setGender = function(gender) {
  this.gender = gender;
}

/* Bind */

export { AlertModalModel, AdditionalModalModel};
