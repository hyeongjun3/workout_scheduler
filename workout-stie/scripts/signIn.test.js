let emailElem = null; /* email input field */
let emailInfoElem = null; /* alert field when entered invalid email */
let pwdElem = null; /* password input field */
let modalDialog = null; /* alert modal dialog for displaying error */
let btnElem = null;

beforeAll(() => {
  require('./signIn.js');
  emailElem = document.querySelector('[data-testid="test-email"]');
  emailInfoElem = document.querySelector('[data-testid="test-info-email"]');
  pwdElem = document.querySelector('[data-testid="test-pwd"]');
  modalDialog = document.querySelector('[data-testid="test-modal"]')
  btnElem = document.querySelector('[data-testid="test-btn"]')
});

describe('[SignIn]', () => {

  let inputEvent = new Event('input', {bubbles : true, cancelable : true});
  let clickEvent = new Event('click', {bubbles : true, cancelable : true});

  // TODO : Check after registering test user
  /*
  test('Success to signin', () => {
    let validEmail = 'whow1101@naver.com';
    emailElem.value = validEmail;
    emailElem.dispatchEvent(inputEvent);

    let validPwd = "123jldjflkasdf~@#$!@#"
    pwdElem.value = validPwd;
    pwdElem.dispatchEvent(inputEvent);

    expect(emailInfoElem.classList.contains('hidden')).toBe(true);
    expect(btnElem.disabled).toBe(false);

    btnElem.dispatchEvent(clickEvent);
    setTimeout(() => {
      expect(window.location.href).toBe("daily.html");
    }, 100)
  });
  */

  test('Enter valid email format', () => {
    let validEmail = 'whow1101@naver.com';
    emailElem.value = validEmail;
    emailElem.dispatchEvent(inputEvent);

    let validPwd = "123jldjflkasdf~@#$!@#"
    pwdElem.value = validPwd;
    pwdElem.dispatchEvent(inputEvent);

    expect(emailInfoElem.classList.contains('hidden')).toBe(true);
    expect(btnElem.disabled).toBe(false);
  });

  test('Fail to signin', () => {
    let validEmail = 'whow1101@naver.com';
    emailElem.value = validEmail;
    emailElem.dispatchEvent(inputEvent);

    let validPwd = "123jldjflkasdf~@#$!@#"
    pwdElem.value = validPwd;
    pwdElem.dispatchEvent(inputEvent);

    expect(emailInfoElem.classList.contains('hidden')).toBe(true);
    expect(btnElem.disabled).toBe(false);

    btnElem.dispatchEvent(clickEvent);
    expect(modalDialog.classList.contains('hidden')).toBe(true);
    setTimeout(() => {
      expect(modalDialog.classList.contains('hidden')).toBe(false);
    }, 100)
  });

  test('Alert when entered invalid email format', () => {
    let invalidEmail = 'whow1101@naver.';
    emailElem.value = invalidEmail;
    emailElem.dispatchEvent(inputEvent);
    expect(emailInfoElem.classList.contains('hidden')).toBe(false);
  });
});
