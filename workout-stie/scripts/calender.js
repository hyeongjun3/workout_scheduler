
function MyDate(date,weight,class_name) {
    this.date = date;
    this.weight = weight;
    this.class_name = class_name;
}

class Calender {
    constructor(document) {
        this.document = document;
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
    }

    setListener() {

    }

    getDateGroup() {
                /* TODO : need to interact with server */;
        let test  = [new MyDate('28','10kg','prev_month'),
                    new MyDate('15','20kg','current_month'),
                    new MyDate('1','30kg','next_month')];
        test.forEach(value => {
            let date_elem = this.document.createElement('div');
            date_elem.className = 'date ' + value.class_name;

            let date_inner_elem = this.document.createElement('div');
            date_inner_elem.className = 'date_inner ';

            let inner_span_elem_1  = this.document.createElement('span');
            inner_span_elem_1.innerHTML = value.date;

            let inner_span_elem_2 = this.document.createElement('span');
            inner_span_elem_2.innerHTML = value.weight;

            date_inner_elem.appendChild(inner_span_elem_1);
            date_inner_elem.appendChild(inner_span_elem_2);

            date_elem.appendChild(date_inner_elem);

            this.date_elem_list.push(date_elem);
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
        /* TODO : should run in promise */
        this.getDateGroup();
    }
}

export {Calender};