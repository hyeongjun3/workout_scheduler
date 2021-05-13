import {Utils} from '../utils.js'

function PrivateInfoModel() {
    this.user = Utils.getUser();
    this.nickname = this.user.nickname;
    this.gender = this.user.gender;

    /* callback */
    this.setNickNameCallback = null;
    this.setGenderCallback = null;
}

/* bind functions from view */
PrivateInfoModel.prototype.bindSetNickname = function (callback) {
    this.setNickNameCallback = callback;
}

PrivateInfoModel.prototype.bindSetGender = function (callback) {
    this.setGenderCallback = callback;
}

/* Other */
PrivateInfoModel.prototype.init = function() {
    this.setNickNameCallback(this.nickname);
    this.setGenderCallback(this.gender);
}


export {PrivateInfoModel};