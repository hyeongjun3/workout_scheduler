import MyRequest from './request.js'

let my_request = new MyRequest();

function MyDate(date,weight,class_name) {
    this.date = date;
    this.weight = weight;
    this.class_name = class_name;
}

class Calender {
    constructor(document, access_token) {
        this.document = document;
        this.access_token = access_token;
        this.target_time = null;
        this.daily_modal = new DailyModal(document, access_token)
        this.daily_modal.setUI();
    }

    refresh(target_time) {
        this.target_time = target_time;
        let target_year = target_time.getFullYear();
        let target_month = target_time.getMonth() + 1;
        let target_date = target_time.getDate();
        
        this.control_detail_elem.innerHTML = `${target_year}년 ${target_month}월`;

        let input = {target_time : `${target_year}-${target_month}-${target_date}`, access_token : this.access_token};
        return new Promise((resolve, reject) => {
            /* TODO : progress bar */
            my_request.getDailyInfo(input)
            .then(value => {
                /* Create Date element  */
                this.getDateGroup(value.calender_daily);
                resolve();
            })
            .catch(err => {
                reject(err);
            });
        })
    }

    progressOn() {
        this.calender_main_window_elem.classList.add('transparent');
        this.progress_bar_elem.classList.remove('hidden');
    }

    setUI() {
        this.setField();
        this.setListener();
        this.combination();
    }

    combination() {
        this.calender_control_elem.appendChild(this.control_left_elem);
        this.calender_control_elem.appendChild(this.control_detail_elem);
        this.calender_control_elem.appendChild(this.control_right_elem);

        this.index_elem_list.forEach(value => {
            this.index_group_elem.appendChild(value);
        })

        this.date_elem_list.forEach(value => {
            this.date_grid_elem.appendChild(value);
        })

        this.calender_elem.appendChild(this.index_group_elem);
        this.calender_elem.appendChild(this.date_grid_elem);

        this.calender_main_window_elem.appendChild(this.calender_control_elem);
        this.calender_main_window_elem.appendChild(this.calender_elem);

        this.document.querySelector('body').appendChild(this.calender_main_window_elem);
        this.document.querySelector('body').appendChild(this.progress_bar_elem);
    }

    setListener() {
        this.date_grid_elem.addEventListener('click', event => {
            let target_elem = event.target.parentElement;
            let target_date = null;

            if (target_elem.className === 'date_inner') {
                target_date = target_elem.childNodes[0].innerHTML;
            } else if (target_elem.classList.contains('date')){
                target_elem = target_elem.childNodes[0];
                target_date = target_elem.childNodes[0].innerHTML;
            } else {
                /* fail to find parent element*/
                return;
            }

            this.target_time.setDate(target_date);
            this.daily_modal.setTargetElem(target_elem.childNodes[1]);
            this.daily_modal.setDate(this.target_time);
            this.daily_modal.showModal();
        })
    }

    getDateGroup(calender_daily) {
        calender_daily.forEach(value => {
            let date_elem = this.document.createElement('div');
            date_elem.className = 'date ' + value.class_name;

            let date_inner_elem = this.document.createElement('div');
            date_inner_elem.className = 'date_inner';

            let inner_span_elem_1  = this.document.createElement('span');
            inner_span_elem_1.innerHTML = value.date;

            let inner_span_elem_2 = this.document.createElement('span');
            inner_span_elem_2.innerHTML = value.weight;

            date_inner_elem.appendChild(inner_span_elem_1);
            date_inner_elem.appendChild(inner_span_elem_2);

            date_elem.appendChild(date_inner_elem);

            this.date_elem_list.push(date_elem);
        })

        this.date_elem_list.forEach(value => {
            this.date_grid_elem.appendChild(value);
        })
    }

    setField(){
        this.calender_main_window_elem = this.document.createElement('div');
        this.calender_main_window_elem.className = 'calender_main_window';

        this.calender_control_elem = this.document.createElement('div');
        this.calender_control_elem.className = 'calender_control';

        this.control_left_elem = this.document.createElement('button');
        this.control_left_elem.className = 'control_left';
        this.control_left_elem.innerHTML = '<'

        this.control_detail_elem = this.document.createElement('button');
        this.control_detail_elem.className = 'control_detail';
        /* TODO : need to interact with server */
        this.control_detail_elem.innerHTML = '2021년 2월';

        this.control_right_elem = this.document.createElement('button');
        this.control_right_elem.className = 'control_right';
        this.control_right_elem.innerHTML = '>';

        this.calender_elem = this.document.createElement('div');
        this.calender_elem.className = 'calender';

        this.index_group_elem = this.document.createElement('div');
        this.index_group_elem.className = 'index_group';

        this.index_elem_list = [];
        let index = ['일','월','화','수','목','금','토'];
        index.forEach(value => {
            let index_elem = this.document.createElement('div');
            index_elem.className = 'index';

            let index_inner_elem = this.document.createElement('span');
            index_inner_elem.className = 'index_inner';
            index_inner_elem.innerHTML = value;

            index_elem.appendChild(index_inner_elem);

            this.index_elem_list.push(index_elem);
        })

        this.date_grid_elem = this.document.createElement('div');
        this.date_grid_elem.className = 'date_grid';
        
        this.date_elem_list = [];
         /* progress bar */
        this.progress_bar_elem = this.document.createElement('div');
        this.progress_bar_elem.classList.add('arc-hider');
        this.progress_bar_elem.classList.add('hidden');
    }
}

class DailyModal {
    constructor(document,access_token) {
        this.document = document;
        this.target_time = null;
        this.access_token = access_token;
        this.target_elem = null;
    }

    setUI() {
        this.setField();
        this.setListener();
        this.combination();
    }

    combination() {
        this.daily_modal.appendChild(this.daily_main_window_elem);

        this.daily_main_window_elem.appendChild(this.daily_top_elem);
        this.daily_main_window_elem.appendChild(this.daily_body_elem);
        this.daily_main_window_elem.appendChild(this.daily_button_group_elem);

        this.daily_top_elem.appendChild(this.daily_delete_elem);
        this.daily_top_elem.appendChild(this.daily_cancel_elem);

        this.daily_body_elem.appendChild(this.daily_date_elem);
        this.daily_body_elem.appendChild(this.daily_weight_elem);

        this.daily_weight_elem.appendChild(this.daily_weight_inner_span_elem);
        this.daily_weight_elem.appendChild(this.daily_weight_inner_input_elem);

        this.daily_button_group_elem.appendChild(this.daily_edit_elem);
        this.daily_button_group_elem.appendChild(this.daily_ok_elem);
        this.daily_button_group_elem.appendChild(this.daily_edit_cancel_elem);

        this.document.querySelector('body').appendChild(this.daily_modal);
    }

    setListener() {
        /* ok button */
        this.daily_ok_elem.addEventListener('click', event => {
            let weight = this.daily_weight_inner_input_elem.value;
            let input_time = `${this.target_time.getFullYear()}-${this.target_time.getMonth()+1}-${this.target_time.getDate()}`
            let input = {access_token : this.access_token,
                         weight : weight,
                         target_time : input_time};

            /* TODO : progress on */
            my_request.createDaily(input)
            .then(value => {
                this.target_elem.innerHTML = `${weight}kg`;
                this.daily_weight_inner_input_elem.setAttribute('disabled', true);

                this.daily_edit_elem.classList.remove('hidden');
                this.daily_ok_elem.className = 'hidden';
                this.daily_edit_cancel_elem.className = 'hidden';
            })
            .catch(err => {
                console.log(err);
            })
        })

        /* cancel button */
        this.daily_edit_cancel_elem.addEventListener('click', event => {
            this.daily_weight_inner_input_elem.setAttribute('disabled', true);

            this.daily_edit_elem.classList.remove('hidden');
            this.daily_ok_elem.className = 'hidden';
            this.daily_edit_cancel_elem.className = 'hidden';
        })

        /* edit button */
        this.daily_edit_elem.addEventListener('click', event => {
            this.daily_weight_inner_input_elem.removeAttribute('disabled');

            this.daily_edit_elem.className = 'hidden';
            this.daily_ok_elem.classList.remove('hidden');
            this.daily_edit_cancel_elem.classList.remove('hidden');
        })

        /* close button */
        this.daily_cancel_elem.addEventListener('click', event => {
            this.daily_modal.close();
        });
    }

    setField() {
        this.daily_modal = this.document.createElement('dialog');
        this.daily_modal.className = 'daily_modal';

        this.daily_main_window_elem = this.document.createElement('div');
        this.daily_main_window_elem.className = 'daily_main_window';

        this.daily_top_elem = this.document.createElement('div');
        this.daily_top_elem.className = 'daily_top';

        this.daily_delete_elem = this.document.createElement('button');
        this.daily_delete_elem.id = 'daily_delete';
        this.daily_delete_elem.innerHTML = '삭제';

        this.daily_cancel_elem = this.document.createElement('button');
        this.daily_cancel_elem.id = 'daily_cancel';
        this.daily_cancel_elem.innerHTML = 'X';

        this.daily_body_elem = this.document.createElement('div');
        this.daily_body_elem.className = 'daily_body';

        this.daily_date_elem = this.document.createElement('div');
        this.daily_date_elem.className = 'daily_date';
        this.daily_date_elem.innerHTML = '날짜';

        this.daily_weight_elem = this.document.createElement('div');
        this.daily_weight_elem.className = 'daily_field';
        this.daily_weight_elem.id = 'daily_weight';

        this.daily_weight_inner_span_elem = this.document.createElement('span');
        this.daily_weight_inner_span_elem.innerHTML = '몸무게';

        this.daily_weight_inner_input_elem = this.document.createElement('input');
        this.daily_weight_inner_input_elem.setAttribute('type', 'number');
        this.daily_weight_inner_input_elem.setAttribute('name', 'daily_weight');
        this.daily_weight_inner_input_elem.id = 'daily_weight';
        this.daily_weight_inner_input_elem.setAttribute('disabled', true);

        this.daily_button_group_elem = this.document.createElement('div');
        this.daily_button_group_elem.className = 'daily_button_group';

        this.daily_edit_elem = this.document.createElement('button');
        this.daily_edit_elem.id = 'daily_edit';
        this.daily_edit_elem.innerHTML = '수정';

        this.daily_ok_elem = this.document.createElement('button');
        this.daily_ok_elem.className = 'hidden';
        this.daily_ok_elem.id = 'daily_ok';
        this.daily_ok_elem.innerHTML = '확인';

        this.daily_edit_cancel_elem = this.document.createElement('button');
        this.daily_edit_cancel_elem.className = 'hidden';
        this.daily_edit_cancel_elem.id = 'daily_edit_cancel';
        this.daily_edit_cancel_elem.innerHTML = '취소';
    }

    setDate(target_time) {
        this.target_time = target_time;
        let target_year = target_time.getFullYear();
        let target_month = target_time.getMonth() + 1;
        let target_date = target_time.getDate();

        this.daily_date_elem.innerHTML = `${target_year}년 ${target_month}월 ${target_date}일`;
    }

    setTargetElem(target_elem) {
        this.target_elem = target_elem;
    }

    showModal() {
        this.daily_modal.showModal();
    }
}

export {Calender, DailyModal};