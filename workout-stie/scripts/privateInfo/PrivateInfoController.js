import { PrivateInfoModel } from './privateInfoModel.js';
import { PrivateInfoView } from './privateInfoView.js';

function PrivateInfoController () {
    this.model = new PrivateInfoModel();
    this.view = new PrivateInfoView();

    /* bind functions from view */
    this.model.bindSetGender(this.view.setGender.bind(this.view));
    this.model.bindSetNickname(this.view.setNickname.bind(this.view));

    /* bind functions from model */
    this.view.bindSetNicknameCallback(this.model.setNickname.bind(this.model));
    this.view.bindConfirmCallback(this.model.requestAdditional.bind(this.model));
    
    /* Init */
    this.model.init();
}

export { PrivateInfoController};