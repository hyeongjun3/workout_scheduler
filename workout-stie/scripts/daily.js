import { Utils as myUtils } from './utils.js';
import { TopNav } from './navigation.js';
import { PrivateInfoView } from './privateInfo/privateInfoView.js';

/* Check if user updated their's nickcname and gender or not*/
const user = myUtils.getUser();

if (
  user.hasOwnProperty('nickname') === false ||
  user.hasOwnProperty('gender') === false
) {
  import('./modal/modal.js').then((module) => {
    const additionalModal = new module.AdditionalModalController();
    additionalModal.showModal();
  });
}

/* Top navigation bar */
const topNav = new TopNav();

/* Private Info */
const test = new PrivateInfoView();
