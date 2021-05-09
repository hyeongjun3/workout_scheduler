import { Utils as myUtils } from './utils.js';

const user = myUtils.getUser();

console.log(user);

if (
  user.hasOwnProperty('nickname') === false ||
  user.hasOwnProperty('gender') === false
) {
  import('./modal/modal.js').then((module) => {
    const additionalModal = new module.AdditionalModalController();
    additionalModal.showModal();
  });
}

// import {AdditionalModalController} from './modal/modal.js'
