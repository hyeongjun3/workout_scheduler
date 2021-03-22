import myHeader from './header.js'
import MyRequest from './request.js'
import {MyDialogTwo} from './mydialog.js'

let my_request = new MyRequest();
let my_dialog_withdrawl = new MyDialogTwo(document, "진짜 탈퇴?" , "ㅇㅇ" , "ㄴㄴ");
let my_header = new myHeader(document);

const update_btn_elem = document.querySelector('button.update');
const withdrawl_btn_elem = document.querySelector('button.withdrawl');

const nickname_input_elem = document.querySelector('input#nickname');
const male_input_elem = document.querySelector('input#male');
const female_input_elem = document.querySelector('input#female');

my_header.setUI();
my_dialog_withdrawl.setUI();
my_dialog_withdrawl.setOkListener(() => {
    let input = {'access_token' : window.sessionStorage.getItem('access_token')}
    my_request.deleteUser(input)
    .then(result => {
        console.log(result);
        window.location.href = 'index.html';
    })
    .catch(err => {
        console.log(err);
    })
})

withdrawl_btn_elem.addEventListener('click', event => {
    event.preventDefault();
    my_dialog_withdrawl.showModal();
})

window.addEventListener('DOMContentLoaded', e => {
    let input = {'access_token' : window.sessionStorage.getItem('access_token')};
    my_request.getUserInfo(input)
    .then(result => {
        console.log(result)
        if(result.hasOwnProperty('status') === false || result.status === false) {
            throw result;
        }

        nickname_input_elem.value = result.nickname;
        if (result.gender === 'M') {
            male_input_elem.setAttribute('checked', true);
        } else {
            female_input_elem.setAttribute('checked', true);
        }
    })
    .catch(err => {
        console.log(err);
    })
})