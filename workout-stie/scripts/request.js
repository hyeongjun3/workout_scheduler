
export default class MyRequest {
  constructor() {
    // TODO : validate arguments
    this.host = "http://127.0.0.1";
    this.port = 3000;
  }

  logInRequest(input) {
    let host = this.host + ':' + this.port + '/login';
    const header = new Headers();
    header.append('Content-Type', 'text/plain')
    const request = new Request(host, {headers: header,
                                       method: 'POST',
                                       mode : 'cors',
                                       body: input });
    let res = fetch(request)
    .then(response => {
      return response
    })
    .catch(error => {
      console.log(`Error message : ${error}`);
    })
    
    return res;
  }

}