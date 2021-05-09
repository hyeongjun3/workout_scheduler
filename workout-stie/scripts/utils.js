const Utils = (function () {
  function getUser() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user || {};
  }

  function setUser(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  return {
    getUser: getUser,
    setUser: setUser,
  };
})();

export { Utils };
