import MyRequest from './request.js'
import {MyDialogTwo} from './mydialog.js'

let my_request = new MyRequest();
let calender_daily = [];

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
                calender_daily = value.calender_daily;
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
        this.date_grid_elem.innerHTML = '';
        this.date_elem_list = [];

        calender_daily.forEach(value => {
            let date_elem = this.document.createElement('div');
            date_elem.className = 'date ' + value.class_name;

            let date_inner_elem = this.document.createElement('div');
            date_inner_elem.className = 'date_inner';

            let inner_span_elem_1  = this.document.createElement('span');
            inner_span_elem_1.innerHTML = value.date;

            let inner_span_elem_2 = this.document.createElement('span');
            if (value.weight !== null) {
                inner_span_elem_2.innerHTML = `${value.weight}kg`;
            }
            date_inner_elem.appendChild(inner_span_elem_1);
            date_inner_elem.appendChild(inner_span_elem_2);

            date_elem.appendChild(date_inner_elem);

            this.date_elem_list.push(date_elem);
        })

        this.date_elem_list.forEach(value => {
            this.date_grid_elem.appendChild(value);
        })
    }
    show() {
        this.calender_main_window_elem.classList.remove('hidden');
    }
    hide() {
        this.calender_main_window_elem.classList.add('hidden');
    }

    setField(){
        this.calender_main_window_elem = this.document.createElement('div');
        this.calender_main_window_elem.className = 'calender_main_window hidden';

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
        this.already_have_weight_flag = false;
        this.my_dialog_two = new MyDialogTwo(document, "진짜?", 'ㅇㅇ', 'ㄴㄴ');
        this.my_dialog_two.setUI();
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

            console.log(input);
            /* TODO : progress on */
            if (this.already_have_weight_flag === true) {
                my_request.editDaily(input)
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
            } else {
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
            }
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

        /* delete button */
        this.daily_delete_elem.addEventListener('click', event => {
            this.my_dialog_two.showModal();
        })

        /* dialog delete button */
        this.my_dialog_two.setOkListener(() => {
            let input_time = `${this.target_time.getFullYear()}-${this.target_time.getMonth()+1}-${this.target_time.getDate()}`
            let input = {access_token : this.access_token,
                         target_time : input_time};
            my_request.deleteDaily(input)
            .then(value => {
                this.daily_weight_inner_input_elem.value = '';
                this.target_elem.innerHTML = '';
                this.daily_weight_inner_input_elem.setAttribute('disabled', true);

                this.daily_edit_elem.classList.remove('hidden');
                this.daily_ok_elem.className = 'hidden';
                this.daily_edit_cancel_elem.className = 'hidden';

                this.my_dialog_two.close();
                this.close();
            })
            .catch(err => {
                console.log(err);
            })
        })
    }

    refresh() {
        this.daily_edit_elem.classList.remove('hidden');
        this.daily_ok_elem.className = 'hidden';
        this.daily_edit_cancel_elem.className = 'hidden';
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
        let weight = this.target_elem.innerHTML;
        if (weight.length !== 0) {
            this.already_have_weight_flag = true;
            weight = weight.substr(0,weight.length-2);
            console.log(weight);
            this.daily_weight_inner_input_elem.value = weight;
        } else {
            this.already_have_weight_flag = false;
            this.daily_weight_inner_input_elem.value = '';
        }
    }

    showModal() {
        this.refresh();
        this.daily_modal.showModal();
    }

    close() {
        this.daily_modal.close();
    }
}

let chartDaily = function() {
    let canvas = document.createElement('canvas');
    let canvas_width = canvas.clientWidth;
    let canvas_height = canvas.clientHeight;
    let parent_width = document.body.clientWidth;
    let date_num = ['-1','31','28','31','30','31','30',
                    '31','31','30','31','30','31'];
    let target_num = null;
    let target_date = null;
    let daily_info = []
    let min_weight = 987654321;
    let max_weight = -987654321;
    let access_token = null;
    let daily_info_point = []
  
    let chart_main_window_elem = null;
    let chart_window_elem = null;

    function Point(y,x) {
        this.y = y;
        this.x = x;
    }

    function setUI() {
        setField();
        combination();
    }

    function combination() {
        document.body.appendChild(chart_main_window_elem);
        chart_main_window_elem.appendChild(chart_window_elem);
    }

    function setField() {
        chart_main_window_elem = document.createElement('div');
        chart_main_window_elem.className = 'chart_main_window'
        chart_window_elem = canvas;
        chart_window_elem.id = 'tutorial';
    }

    function show() {
        chart_main_window_elem.classList.remove('hidden');
    }
    
    function hide() {
        chart_main_window_elem.classList.add('hidden');
    }

    function setDate(date) {
      target_date = date;
      target_num = date_num[target_date.getMonth()+1];
    }

    function setAccessToken(__access_token) {
        access_token = __access_token;
    }
  
    function setDailyInfo(target_time) {
        let target_year = target_time.getFullYear();
        let target_month = target_time.getMonth() + 1;
        let target_date = target_time.getDate();

        let input = {target_time : `${target_year}-${target_month}-${target_date}`, access_token : access_token};

        /* 값이 있는지 확인하고 없으면 통신 X*/
        return new Promise((resolve, reject) => {
            /* TODO : progress bar */
            my_request.getDailyInfo(input)
            .then(value => {
                /* Create Date element  */
                calender_daily = value.calender_daily;
                daily_info = value.calender_daily;
                daily_info = daily_info.filter(value => value.weight !== null);
                daily_info.forEach(value => {
                    if (value.weight > max_weight) {
                        max_weight = value.weight;
                    }
                    
                    if (value.weight < min_weight) {
                        min_weight = value.weight;
                    }
                })
                console.log(min_weight, max_weight);
                resolve();
            })
            .catch(err => {
                reject(err);
            });
        })
    }
    
    function resize() {
      parent_width = canvas.parentElement.clientWidth;
      canvas_width = parent_width - 260;
      canvas_height = parseInt(canvas_width/1.618);
      canvas.setAttribute('width',canvas_width)
      canvas.setAttribute('height',canvas_height);
    }
  
    function draw() {
      resize()
  
      if(!canvas.getContext) {
        return;
      }
  
      let ctx = canvas.getContext('2d');
  
      /* Draw y-axis */
      let bottom_margin = canvas_height * 0.05;
      let padding_width = canvas_width * 0.05;
      let step_line_len = canvas_height * 0.025;
      let verical_line_len = step_line_len * 0.6;
      let y_axis_step_size = (canvas_width - 2*padding_width)/target_num;
      for(let i=0; i<target_num; i++) {
        let x = i * y_axis_step_size + padding_width; 
        let y = canvas_height - bottom_margin;
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x,y+verical_line_len);
        if (i+1>=10) {
          ctx.fillText(i+1, x-5,y+verical_line_len+verical_line_len);
        } else {
          ctx.fillText(i+1, x-3,y+verical_line_len+verical_line_len);
        }      
        ctx.stroke();
      }
  
      /* Draw x-axis */
      let weight_step_num = 10;
      let x_axis_step_size = (canvas_height-2*bottom_margin)/weight_step_num;
      for(let weight = 0; weight<max_weight-min_weight; weight++) {
          let y = bottom_margin + weight * x_axis_step_size;
          ctx.beginPath();
          ctx.moveTo(padding_width-y_axis_step_size, y);
          ctx.lineTo(canvas_width-padding_width, y);
          ctx.stroke();
      }
      
      daily_info_point = [];
      let prev_point = null;
      daily_info.forEach(value => {
        let x = (value.date-1) * y_axis_step_size + padding_width;
        /* normalize according to weight_step_num */
        let normalized_y = (value.weight - min_weight)/(max_weight-min_weight);
        let y = bottom_margin + normalized_y * (weight_step_num-2) * x_axis_step_size + x_axis_step_size;
        y = canvas_height - y;
        daily_info_point.push(new Point(y,x))
        console.log(`date: ${value.date} weight: ${value.weight} X : ${x} Y : ${y}`)
        ctx.beginPath();
        ctx.arc(x,y, 10, 0, Math.PI*2, true);
        ctx.stroke();

        if(prev_point !== null) {
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.moveTo(x,y);
            ctx.lineTo(prev_point.x,prev_point.y);
            ctx.stroke();
            ctx.lineWidth = 1;
        }

        prev_point = new Point(y,x);
      })
    }
  
    return {
      setDate : setDate,
      resize : resize,
      draw : draw,
      setDailyInfo : setDailyInfo,
      setAccessToken : setAccessToken,
      setUI : setUI,
      show : show,
      hide : hide,
    }
  }

export {Calender, DailyModal, chartDaily};