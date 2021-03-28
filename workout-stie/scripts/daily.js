import myHeader from "./header.js"
import MyRequest from './request.js'
import {MyDialogOne, MyDialogAdditional} from './mydialog.js'
import {SideBar} from './sidebar.js'
import {Calender, chartDaily} from './calender.js'

let access_token = window.sessionStorage.getItem('access_token')

// check user whether need to update additional info
let additional_flag = window.sessionStorage.getItem('additional_flag') === 'true' ? true : false;

if(additional_flag === false) {
  console.log('!!')
  addiotnal_dialog.showModal();
}


let my_header = new myHeader(document);
let alert_dialog = new MyDialogOne(document, "default", "확인");
let addiotnal_dialog = new MyDialogAdditional(document);
let side_bar = new SideBar(document);
let my_request = new MyRequest();
let calender = new Calender(document,access_token);
let my_chart_daily = chartDaily();

my_chart_daily.setUI();
my_chart_daily.setAccessToken(window.sessionStorage.getItem('access_token'));
my_chart_daily.setDate(new Date);

my_header.setUI();
alert_dialog.setUI();
addiotnal_dialog.setUI();
side_bar.setUI();
calender.setUI();

side_bar.setCharSubMenuListener(() => {
  calender.hide();
  my_chart_daily.show();
})

side_bar.setCalenderSubMenuListener(() => {
  calender.show();
  my_chart_daily.hide();
  calender.refresh(new Date());
})

addiotnal_dialog.setConfirmListener(event => {
  let input = addiotnal_dialog.getInput();
  input.access_token = window.sessionStorage.getItem('access_token')
  
  my_request.addAdditionalInfo(input)
  .then( value => {
    if (value.status === true) {
      console.log("Success");
      window.sessionStorage.setItem('additional_flag', 'true');
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

my_chart_daily.setDailyInfo(new Date())
.then(() => {
  my_chart_daily.draw();
});

window.onresize = my_chart_daily.draw;
