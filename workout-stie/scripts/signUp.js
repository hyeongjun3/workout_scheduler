import { SignUpController as SignUpWindow } from './user/signController.js';

const signUpWindow = new SignUpWindow() ?? null;

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (signUpWindow.isOpen()) {
      signUpWindow.hideModal();
    }
  }
});
