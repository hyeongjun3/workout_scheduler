import myHeader from "./header.js"
import MyRequest from './request.js'
import {MyDialogOne, MyDialogAdditional} from './mydialog.js'
import {SideBar} from './sidebar.js'

let my_header = new myHeader(document);
let alert_dialog = new MyDialogOne(document, "default", "확인");
let addiotnal_dialog = new MyDialogAdditional(document);
let side_bar = new SideBar(document);
let my_request = new MyRequest();
let access_token = '';

my_header.setUI();
alert_dialog.setUI();
addiotnal_dialog.setUI();
side_bar.setUI();

addiotnal_dialog.setConfirmListener(event => {
  let input = addiotnal_dialog.getInput();
  input.access_token = window.sessionStorage.getItem('access_token')
  
  my_request.addAdditionalInfo(input)
  .then( value => {
    if (value.status === true) {
      console.log("Success");
      window.sessionStorage.setItem('additional_flag', 'true');
      addiotnal_dialog.close();
    } else {
      alert_dialog.setMessage(value.message);
      alert_dialog.showModal();
    }
    console.log(value);
  })
  .catch (error => {
    console.log(error);
  })
});


document.addEventListener('DOMContentLoaded', function() {
  access_token = window.sessionStorage.getItem('access_token')

  // check user whether need to update additional info
  let additional_flag = window.sessionStorage.getItem('additional_flag') === 'true' ? true : false;

  if(additional_flag === false) {
    console.log('!!')
    addiotnal_dialog.showModal();
  }

  // cookie method
  // const cookie_list = document.cookie.split(';').map(value => value.trim());

  // console.log(cookie_list);
},false)