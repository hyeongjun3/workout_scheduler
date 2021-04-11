const MyRequest = (function () {
  const host = 'http://localhost';
  const port = 3000;

  function requestToServer(input, apiName) {
    const api = `${this.host}:${this.port}/${apiName}`;
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    const request = new Request(api, {
      header: header,
      method: 'POST',
      body: input,
    });

    const ret = fetch(request)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        return error;
      });
    return ret;
  }

  function signUp(email, password) {
    /* create input of json format */
    const input = { email: email, password: password };
    const jsonInput = JSON.stringify(input);
    /* request to server */
    return requestToServer(jsonInput, '/v1/signup');
  }

  return {
    signUp: signUp,
  };
})();

export { MyRequest };
