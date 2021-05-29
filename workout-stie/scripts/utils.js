const Utils = (function () {
  let email = null;
  let nickname = null;
  let gender = null;

  function getUser() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    email = user?.email;
    nickname = user?.nickname;
    gender = user?.gender;
    return user || {};
  }

  function setUser(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
    email = user?.email;
    nickname = user?.nickname;
    gender = user?.gender;
  }

  return {
    getUser: getUser,
    setUser: setUser,
  };
})();

export { Utils };
