import { SignInController as SignInWindow } from './user/signController.js';

const signInWindow = new SignInWindow() ?? null;

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (signInWindow.isOpen()) {
        signInWindow.hideModal();
      }
    }
  });
  