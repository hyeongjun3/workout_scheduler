let emailElem = null; /* email input field */
let emailInfoElem = null; /* alert field when entered invalid email */
let pwdElem = null; /* password input field */
let pwd2Elem = null; /* password2 input field */
let pwdInfoElem = null; /* alert field when entered invalid password */
let modalDialog = null; /* alert modal dialog for displaying error */
let btnElem = null;

beforeAll(() => {
  require('./signUp.js');
  emailElem = document.querySelector('[data-testid="test-email"]');
  emailInfoElem = document.querySelector('[data-testid="test-info-email"]');
  pwdElem = document.querySelector('[data-testid="test-pwd"]');
  pwd2Elem = document.querySelector('[data-testid="test-pwd2"]');
  pwdInfoElem = document.querySelector('[data-testid="test-info-pwd2"]');
  modalDialog = document.querySelector('[data-testid="test-modal"]');
  btnElem = document.querySelector('[data-testid="test-btn"]')
});

describe('[SignUp]', () => {
  let validEmail = 'whow1101@naver.com';
  let validPwd = "123jldjflkasdf~@#$!@#"
  let invalidEmail = "adfadsfsdn@mnadf.";

  let inputEvent = new Event('input', {bubbles : true, cancelable : true});
  let clickEvent = new Event('click', {bubbles : true, cancelable : true});

  test('Enter valid email format', () => {
    emailElem.value = validEmail;
    emailElem.dispatchEvent(inputEvent);
    pwdElem.value = validPwd;
    pwdElem.dispatchEvent(inputEvent);
    pwd2Elem.value = validPwd;
    pwd2Elem.dispatchEvent(inputEvent);

    expect(emailInfoElem.classList.contains('hidden')).toBe(true);
    expect(pwdInfoElem.classList.contains('hidden')).toBe(true);
    expect(btnElem.disabled).toBe(false)
  });

  test('Alert when entered invalid email format', () => {
    emailElem.value = invalidEmail;
    emailElem.dispatchEvent(inputEvent);
    pwdElem.value = validPwd;
    pwdElem.dispatchEvent(inputEvent);
    pwd2Elem.value = validPwd;
    pwd2Elem.dispatchEvent(inputEvent);

    expect(emailInfoElem.classList.contains('hidden')).toBe(false);
    expect(btnElem.disabled).toBe(true);
  });

  test('Alert when different pwd and pwd2', () => {
    pwdElem.value = validPwd;
    pwdElem.dispatchEvent(inputEvent);
    pwd2Elem.value = validPwd + 'asdfasdf';
    pwd2Elem.dispatchEvent(inputEvent);

    expect(pwdInfoElem.classList.contains('hidden')).toBe(false);
    expect(btnElem.disabled).toBe(true)
  })
});
