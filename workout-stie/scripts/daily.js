import myHeader from "./header.js"

console.log('daily!!!');

let my_header = new myHeader(document)
my_header.setUI();

document.addEventListener('DOMContentLoaded', function() {
  const cookie_list = document.cookie.split(';').map(value => value.trim());
  console.log(cookie_list)

  let has_additional_info_cookie = cookie_list.find(value => value.includes("has_additional_info"));
  let has_additional_info = (has_additional_info_cookie.split('=')[1] == true ? true : false);
  console.log(has_additional_info);

  
},false)