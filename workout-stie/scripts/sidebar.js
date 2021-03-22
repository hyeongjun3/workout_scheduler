/*
<div class="side_bar">
    <div class="main_menu" id="private_menu">
        <span class="selected">개인</span>
        <div class="sub_menu" id="calender_sub_menu">캘린더형 일지</div>
        <div class="sub_menu" id="chart_sub_menu">차트형 일지</div>
        <div class="sub_menu" id="private_info_sub_menu">개인 정보</div>
    </div>
    <div class="main_menu" id="group_menu">
        <span>그룹</span>
        <div class="sub_menu" id="add_group_sub_menu">그룹 추가</div>
    </div>
</div>
*/

class SideBar {
    constructor(document) {
        this.document = document;
    }

    setUI() {
        this.setField();
        this.setListener();
        this.combination();
    }

    combination() {
        this.private_menu_elem.appendChild(this.selected_elem);
        this.private_menu_elem.appendChild(this.calender_sub_menu_elem);
        this.private_menu_elem.appendChild(this.chart_sub_menu_elem);
        this.private_menu_elem.appendChild(this.private_info_sub_menu);

        this.group_menu_elem.appendChild(this.group_menu_span_elem);
        this.group_menu_elem.appendChild(this.add_group_sub_menu_elem);

        this.side_bar_elem.appendChild(this.private_menu_elem);
        this.side_bar_elem.appendChild(this.group_menu_elem);

        this.document.querySelector('body').appendChild(this.side_bar_elem);
    }

    setListener() {
        this.private_menu_elem.addEventListener('click', event => {
            this.group_menu_span_elem.classList.remove('selected');
            this.selected_elem.classList.add('selected');
            switch(event.target) {
                case this.calender_sub_menu_elem:
                    this.calender_sub_menu_elem.classList.add('selected');
                    this.chart_sub_menu_elem.classList.remove('selected');
                    this.private_info_sub_menu.classList.remove('selected');
                    console.log('calender');
                    break;
                case this.chart_sub_menu_elem:
                    this.calender_sub_menu_elem.classList.remove('selected');
                    this.chart_sub_menu_elem.classList.add('selected');
                    this.private_info_sub_menu.classList.remove('selected');
                    console.log('chart');
                    break;
                case this.private_info_sub_menu:
                    this.calender_sub_menu_elem.classList.remove('selected');
                    this.chart_sub_menu_elem.classList.remove('selected');
                    this.private_info_sub_menu.classList.add('selected');
                    console.log('private');
                    break;
                default:
                    console.log('Unkonw');
                    console.log(event.target);
                    break;
            }
        })

        this.group_menu_elem.addEventListener('click', event => {
            this.group_menu_span_elem.classList.add('selected');
            this.selected_elem.classList.remove('selected');
            switch(event.target) {
                case this.add_group_sub_menu_elem:
                    console.log('add group');
                    break;
                default:
                    console.log(event.target);
                    break;
            }
        })
    }

    setField() {
        this.side_bar_elem = this.document.createElement('div');
        this.side_bar_elem.className = 'side_bar';

        this.private_menu_elem = this.document.createElement('div');
        this.private_menu_elem.className = 'main_menu';
        this.private_menu_elem.id = 'private_menu';

        this.selected_elem = this.document.createElement('span');
        this.selected_elem.innerHTML = '개인';
        
        this.calender_sub_menu_elem = this.document.createElement('div');
        this.calender_sub_menu_elem.className = 'sub_menu';
        this.calender_sub_menu_elem.id = 'calendar_sub_menu';
        this.calender_sub_menu_elem.innerHTML = '캘린더형 일지';

        this.chart_sub_menu_elem = this.document.createElement('div');
        this.chart_sub_menu_elem.className = 'sub_menu';
        this.chart_sub_menu_elem.id = 'chart_sub_menu';
        this.chart_sub_menu_elem.innerHTML = '차트형 일지';

        this.private_info_sub_menu = this.document.createElement('div');
        this.private_info_sub_menu.className = 'sub_menu';
        this.private_info_sub_menu.id = 'private_info_sub_menu';
        this.private_info_sub_menu.innerHTML = '개인 정보'

        this.group_menu_elem = this.document.createElement('div');
        this.group_menu_elem.className = 'main_menu';
        this.group_menu_elem.id = 'group_menu';

        this.group_menu_span_elem = this.document.createElement('span');
        this.group_menu_span_elem.innerHTML = '그룹';

        this.add_group_sub_menu_elem = this.document.createElement('div');
        this.add_group_sub_menu_elem.className = 'sub_menu';
        this.add_group_sub_menu_elem.id = 'add_group_sub_menu';
        this.add_group_sub_menu_elem.innerHTML = '그룹 추가';
    }
}

export {SideBar};