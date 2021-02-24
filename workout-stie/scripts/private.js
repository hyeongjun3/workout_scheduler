import myHeader from './header.js'
import MyRequest from './request'

let my_header = new myHeader(document);
my_header.setUI();

let my_request = new MyRequest();

const update_btn_elem = document.querySelector('button.update');
const withdrawl_btn_elem = document.querySelector('button.withdrawl');

const nickname_input_elem = document.querySelector('input#nickname');
const male_input_elem = document.querySelector('input#male');
const female_input_elem = document.querySelector('input#female');

window.addEventListener('DOMContentLoaded', e => {
    let input = {'access_token' : window.sessionStorage.getItem('access_token')};
    my_request.getUserInfo(input)
    .then(result => {
        ]})
})