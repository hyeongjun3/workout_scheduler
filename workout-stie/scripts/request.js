export default class MyRequest {
  constructor() {
    // TODO : validate arguments
    this.host = "http://localhost";
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

  logOutRequest(input) {
    console.log("Request Log Out");
    let host = this.host + ':' + this.port + '/logout';
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    let json_input = JSON.stringify(input);
    const request = new Request(host, {headers: header,
                                        method: 'POST',
                                        credentials : 'include',
                                        body: json_input,
                                      });
    let res = fetch(request)
    .then(response => {
    return response.json()
    })
    .catch(error => {
      console.log(`Error message : ${error}`);
      return error;
    })

    return res;
  }

  SignUpRequest(input) {
    let host = this.host + ':' + this.port + '/signUp';
    console.log("Fetch to ", host);
    const header = new Headers();
    header.append('Content-Type', 'application/json')
    let json_input = JSON.stringify(input)
    const request = new Request(host, {headers: header,
                                        method: 'POST',
                                        credentials : 'include',
                                        body: json_input });
    let res = fetch(request)
    .then(response => response.json())
    .catch( error => error)

    return res;
  }

  addAdditionalInfo(input) {
    let host = this.host + ':' + this.port + '/addAdditionalInfo';
    const header = new Headers();
    header.append('Content-Type', 'application/json')
    let json_input = JSON.stringify(input)
    const request = new Request(host, {headers: header,
                                        method: 'POST',
                                        credentials : 'include',
                                        body: json_input });
    let res = fetch(request)
    .then(response => response.json())
    .catch( error => {
      console.log(error)
    })

    return res;
  }

  getEmailByAccessToken(input) {
    let host = this.host + ':' + this.port + '/getEmailByAccessToken';
    const header = new Headers();
    header.append('Content-Type', 'application/json')
    let json_input = JSON.stringify(input)
    const request = new Request(host, {headers: header,
                                        method: 'POST',
                                        credentials : 'include',
                                        body : json_input,
                                        });
    let res = fetch(request)
    .then(response => response.json())
    .catch( error => {
      console.log(error)
    })

    return res;
  }

  verification(input) {
    let host = this.host + ':' + this.port + '/verification';
    const header = new Headers();
    header.append('Content-Type', 'application/json')
    let json_input = JSON.stringify(input)
    const request = new Request(host, {headers: header,
                                        method: 'POST',
                                        credentials : 'include',
                                        body : json_input,
                                        });
    let res = fetch(request)
    .then(response => response.json())
    .catch( error => {
      console.log(error)
    })

    return res;
  }
}