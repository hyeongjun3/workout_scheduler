
export default class MyRequest {
  constructor() {
    // TODO : validate arguments
    this.host = "http://127.0.0.1";
    this.port = 3000;
  }

  logInRequest(input) {
    console.log("Request")
    let host = this.host + ':' + this.port + '/login';
    const header = new Headers();
    header.append('Content-Type', 'application/json')
    let json_input = JSON.stringify(input);
    const request = new Request(host, {headers: header,
                                       method: 'POST',
                                      //  mode : 'cors',
                                       credentials : 'include',
                                       body: json_input });
    let res = fetch(request)
    .then(response => {
      return response.json()
    })
    .catch(error => {
      console.log(`Error message : ${error}`);
    })
    
    return res;
  }

  SignUpRequest(input) {
    let host = this.host + ':' + this.port + '/signUp';
    const header = new Headers();
    header.append('Content-Type', 'application/json')
    let json_input = JSON.stringify(input)
    const request = new Request(host, {headers: header,
                                        method: 'POST',
                                        mode : 'cors',
                                        body: json_input });
    let res = fetch(request)
    .then(response => response.json())
    .catch( error => {
      console.log(error)
    })

    return res;
  }
}