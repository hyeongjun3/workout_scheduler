import '../../image/logo.png';

import {SignView} from '../user/signView.js';

function ValidationView() {
    SignView.call(this);

    this.resendCode = this.createElement('a', 'resend-code');
    this.resendCode.innerHTML = '확인코드 다시 전송?';
    this.userMainWindow.appendChild(this.resendCode);
}

ValidationView.prototype = Object.create(SignView.prototype);

/* bind */
ValidationView.prototype.bindCodeInput = function (handler) {
    const codeInputElem = this.userInputFieldGroup['input-code'].inputElem;
    codeInputElem.addEventListener('input', () => {
        handler(codeInputElem.value);
    })
}

ValidationView.prototype.bindResend = function (handler) {
    this.resendCode.addEventListener('click', () => {
        handler();
    })
}

export { ValidationView };
