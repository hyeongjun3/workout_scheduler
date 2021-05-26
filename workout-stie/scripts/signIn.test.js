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
  test('Enter valid email format', () => {
    let validEmail = 'whow1101@naver.com';
    emailElem.value = validEmail;
    let event = new Event('input', { bubbles: true, cancelable: true });
    emailElem.dispatchEvent(event);

    let validPwd = "123jldjflkasdf~@#$!@#"
    pwdElem.value = validPwd;
    pwdElem.dispatchEvent(event);

    expect(emailInfoElem.classList.contains('hidden')).toBe(true);
    expect(btnElem.disabled).toBe(false)
  });

  test('Alert when entered invalid email format', () => {
    let invalidEmail = 'whow1101@naver.';
    emailElem.value = invalidEmail;
    let event = new Event('input', { bubbles: true, cancelable: true });
    emailElem.dispatchEvent(event);
    expect(emailInfoElem.classList.contains('hidden')).toBe(false);
  });
});
