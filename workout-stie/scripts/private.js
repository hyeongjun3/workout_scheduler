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

const update_btn_group_elem = document.querySelector('.update_button_group');
const ok_btn_elem = document.querySelector('button.ok');
const cancel_btn_elem = document.querySelector('button.cancel');

function getUserInfo() {
    let input = {'access_token' : window.sessionStorage.getItem('access_token')};
    nickname_input_elem.setAttribute('disabled', true);
    male_input_elem.setAttribute('disabled', true);
    female_input_elem.setAttribute('disabled', true);

    return new Promise((resolve,reject) => {
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

            resolve();
        })
        .catch(err => {
            console.log(err);
            reject(err);
        })
    }) 
}

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

update_btn_elem.addEventListener('click', event => {
    event.preventDefault();
    nickname_input_elem.removeAttribute('disabled');
    male_input_elem.removeAttribute('disabled');
    female_input_elem.removeAttribute('disabled');
    update_btn_group_elem.classList.remove('hidden')
})

ok_btn_elem.addEventListener('click', event => {
    let input = {
        'access_token' : window.sessionStorage.getItem('access_token'),
        'nickname' : nickname_input_elem.value,
        'gender' : male_input_elem.checked === true ? 'male' : 'female' 
    }
    
    my_request.addAdditionalInfo(input)
    .then(() => {
        return getUserInfo();
    })
    .then(() => {
        update_btn_group_elem.classList.add('hidden')
    })
    .catch(err => {
        console.log(err);
    })
})

cancel_btn_elem.addEventListener('click', event => {
    update_btn_group_elem.classList.add('hidden')
    getUserInfo();
})

window.addEventListener('DOMContentLoaded', e => {
    getUserInfo();
})