import myHeader from "./header.js"
import {MyDialogAdditional} from './mydialog.js'

console.log('daily!!!');

let my_header = new myHeader(document);
let addiotnal_dialog = new MyDialogAdditional(document);

my_header.setUI();
addiotnal_dialog.setUI();

document.addEventListener('DOMContentLoaded', function() {
  const cookie_list = document.cookie.split(';').map(value => value.trim());

  let has_additional_info_cookie = cookie_list.find(value => value.includes("has_additional_info"));
  let has_additional_info = (has_additional_info_cookie.split('=')[1] == true ? true : false);

  if (has_additional_info === false) {
    // TODO : 추가 정보 입력 호출
    addiotnal_dialog.showModal();
  }
  
},false)