import { Utils } from '../utils.js';

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

function PrivateInfoModel() {
  this.user = Utils.getUser();
  this.nickname = this.user.nickname;
  this.gender = this.user.gender;

  /* callback */
  this.setNickNameCallback = null;
  this.setGenderCallback = null;
}

/* setter */
PrivateInfoModel.prototype.setNickname = function (nickname) {
  this.nickname = nickname;
  return myRequest
    .checkNickname(this.nickname)
    .then((user) => {
      if (user.data.byNickname.items.length == 0) {
        return true
      } else {
        console.log('!!');
        throw 'existed nickname'
      }
    })
    .catch((err) => {
      throw err
    })
};

/* bind functions from view */
PrivateInfoModel.prototype.bindSetNickname = function (callback) {
  this.setNickNameCallback = callback;
};

PrivateInfoModel.prototype.bindSetGender = function (callback) {
  this.setGenderCallback = callback;
};

/* Other */
PrivateInfoModel.prototype.init = function () {
  this.setNickNameCallback(this.nickname);
  this.setGenderCallback(this.gender);
};

PrivateInfoModel.prototype.requestAdditional = function (nickname, gender) {
  this.user.nickname = nickname;
  this.user.gender = gender;
  return myRequest.registerAdditionalInfo(this.user.email, this.user.nickname, this.user.gender)
  .then(() => {
    myUtils.setUser(this.user);
    return
  });
}

export { PrivateInfoModel };
