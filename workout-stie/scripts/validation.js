import MyRequest from './request.js'

let access_token = '';

let my_request = new MyRequest();

document.addEventListener('DOMContentLoaded', event => {
  const email_info_elem = document.querySelector(".verfication_window > p");

  my_request.getEmailByAccessToken().then(value => {
    console.log(value);
  });
  
  console.log(email_info_elem)
});