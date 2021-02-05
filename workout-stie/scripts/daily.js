import myHeader from "./header.js"
import MyRequest from './request.js'
import {MyDialogOne, MyDialogAdditional} from './mydialog.js'

console.log('daily!!!');

let my_header = new myHeader(document);
let alert_dialog = new MyDialogOne(document, "default", "확인");
let addiotnal_dialog = new MyDialogAdditional(document);
let my_request = new MyRequest();

my_header.setUI();
alert_dialog.setUI();
addiotnal_dialog.setUI();

addiotnal_dialog.setConfirmListener(event => {
  let input = addiotnal_dialog.getInput();
  
  my_request.addAdditionalInfo(input)
  .then( value => {
    if (value.status === true) {
      console.log("Success");
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
  const cookie_list = document.cookie.split(';').map(value => value.trim());

  let has_additional_info_cookie = cookie_list.find(value => value.includes("has_additional_info"));
  let has_additional_info = (has_additional_info_cookie.split('=')[1] == 'true' ? true : false);
  if (has_additional_info === false) {
    // TODO : 추가 정보 입력 호출
    addiotnal_dialog.showModal();
  }
  
},false)