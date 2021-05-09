let myRequest = null;
let myUtils = null;

/* Checking window object if it has my request module */
if (window.hasOwnProperty('myRequest') === false) {
  import('../request.js').then((module) => {
    myRequest = module.MyRequest;
  });
}

if (window.hasOwnProperty('myUtils') === false) {
  import('../utils.js').then((module) => {
    myUtils = module.Utils;
  })
}

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
  this.nicknameFlag = false;
  this.genderFlag = false;
}

/* Setter */
AdditionalModalModel.prototype.setNickname = function (nickname) {
  this.nickname = nickname;

  myRequest
    .checkNickname(this.nickname)
    .then((value) => {
      if (value.success == true) {
        this.nicknameFlag = true;
        this.setNicknameCallback(false);
      } else {
        this.nicknameFlag = false;
        this.setNicknameCallback(true);
      }
    })
    .catch((err) => {
      console.error(err);
      this.nicknameFlag = false;
      this.setNicknameCallback(false);
    })
    .finally(() => {
      this.checkInputValid();
    });
};

AdditionalModalModel.prototype.setGender = function (gender) {
  this.genderFlag = true;
  this.gender = gender;

  this.checkInputValid();
};

/* Bind */
AdditionalModalModel.prototype.bindSetNicknameCallback = function (callback) {
  this.setNicknameCallback = callback;
};

AdditionalModalModel.prototype.bindSetConfirmBtnCallback = function (callback) {
  this.setConfirmBtnCallback = callback;
};

/* Others */
AdditionalModalModel.prototype.checkInputValid = function () {
  if (this.nicknameFlag === true && this.genderFlag === true) {
    this.setConfirmBtnCallback(true);
  } else {
    this.setConfirmBtnCallback(false);
  }
};

AdditionalModalModel.prototype.requestAdditional = function () {
  return myRequest.registerAdditionalInfo(this.nickname, this.gender)
  .then(() => {
    let user = myUtils.getUser();
    user.nickname = this.nickname;
    user.gender = this.gender;
    myUtils.setUser(user);
    return
  });
};

export { AlertModalModel, AdditionalModalModel };
