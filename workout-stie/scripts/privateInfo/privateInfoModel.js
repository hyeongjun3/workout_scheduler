import { Utils } from '../utils.js';

let myRequest = null;

/* Checking window object if it has my request module */
if (window.hasOwnProperty('myRequest') === false) {
  import('../request.js').then((module) => {
    myRequest = module.MyRequest;
  });
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
      console.log(user)
      console.log(user.data.byNickname.items.length)
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

export { PrivateInfoModel };
