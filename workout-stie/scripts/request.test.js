const myRequest = require('./request').MyRequest;

const newUser = {email : "newUser@naver.com", pwd : 'asdfasdfhjlj23@'}
const testUser = { email: 'test@naver.com', pwd: 'woekdjfzcfdo1' };

/* SignUp test */
describe('[SignUp]', () => {
    /*TODO : delete user after sign up */
    test('Success', () =>
        myRequest.signUp(newUser.email, newUser.pwd)
        .then(user => {
            expect().toBe();
        })
    )

  test('Fail : existed email', () => {
    return myRequest.signUp(testUser.email, 'woekdjfzcfdo1').catch((err) => {
      // console.log(err);
      expect(err.code).toBe('UsernameExistsException');
    });
  });

  test('Fail : invalid password', () => {
    return myRequest.signUp(testUser.email, '1234').catch((err) => {
    //   console.log(err);
      expect(err.code).toBe('InvalidParameterException');
    });
  });
});
