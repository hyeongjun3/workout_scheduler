import MyRequest from './request.js'
import { MyDialogOne } from "./mydialog.js"

let my_request = new MyRequest();
let my_dialog = new MyDialogOne(document,"default", "확인")
my_dialog.setUI();

const email_info_elem = document.querySelector(".verfication_window > p");
let input = {"access_token" : window.sessionStorage.getItem('access_token')};

my_request.getEmailByAccessToken(input).then(value => {
  console.log(value);
  email_info_elem.innerHTML = value.email + '로 메일 보냈습니다'
});


const verification_btn_elem = document.querySelector('.verification_form > button');
const verificatin_input_elem = document.querySelector('#verfication_code');
verification_btn_elem.addEventListener('click', e => {
  let input = {'code' : verificatin_input_elem.value}
  my_request.verification(input)
  .then(value => {
    if(value.status === true) {
      window.sessionStorage.setItem('additional_flag','true');
      window.location.href = './index.html';
    } else {
      my_dialog.setMessage(value.message);
      my_dialog.showModal();
    }
  })
  .catch(err => {
    console.log(err);
  })
})