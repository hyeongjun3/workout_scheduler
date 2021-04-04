import { MyDialogTwo } from "./mydialog.js"
import MyRequest from "./request.js"

{/*
<header class="header">
  <div class="header_flex">
    <img src="image/logo.png" alt="logo" class="header_logo header_img">
    <div class= "dropdown">
      <a href="#" class="dropdown_user">
        <img href="#" src="image/user.png" alt="user" class="header_user">
      </a>
      <ul class="dropdown_menu">
        <a href="index.html">개인정보</a>
        <a>로그아웃</a>
      </ul>
    </div>
  </div>
</header>
*/}

export default class myHeader {
  constructor(document) {
    this.document = document
  }

  setUI () {
    this.setField();
    this.setListener();
    this.combination();
  }

  combination () {

    this.dropdown_user.appendChild(this.header_user);
    this.dropdown_menu.appendChild(this.dropdown_menu_private);
    this.dropdown_menu.appendChild(this.dropdown_menu_logout);

    this.dropdown.appendChild(this.dropdown_user);
    this.dropdown.appendChild(this.dropdown_menu);

    this.header_flex.appendChild(this.header_logo);
    this.header_flex.appendChild(this.dropdown);

    this.header.appendChild(this.header_flex);
   
    this.document.querySelector('body').prepend(this.header);
  }

  setListener () {
    this.dropdown_user.addEventListener("click", event => {
      this.dropdown_menu.classList.toggle("flex");
    })

    this.dropdown_menu_logout.addEventListener('click', event => {
      this.my_dialog.showModal();
    })

    this.my_dialog.setOkListener(event => {
      let input = {'access_token' : window.sessionStorage.getItem('access_token')}
      this.my_request.logOutRequest(input).then( result => {
        if (result.status === true) {
          window.location.replace("index.html");
        } else {
          // this.my_dialog.close();
        }
      });
    });
  }

  setField () {
    this.header =  this.document.createElement('header');
    this.header.className = "header";

    this.header_flex = this.document.createElement('div');
    this.header_flex.className = "header_flex";

    this.header_logo = this.document.createElement('img');
    this.header_logo.className = "header_logo header_img";
    this.header_logo.setAttribute("src", "image/logo.png");
    this.header_logo.setAttribute("alt", "header logo");

    this.dropdown = this.document.createElement('div');
    this.dropdown.className = "dropdown"

    this.dropdown_user = this.document.createElement('a');
    this.dropdown_user.className = "dropdown_user"
    // this.dropdown_user.setAttribute("href",'#');

    this.header_user = this.document.createElement('img');
    this.header_user.className = "header_user";
    this.header_user.setAttribute("src", "image/user.png");
    this.header_user.setAttribute("alt","user");

    this.dropdown_menu = this.document.createElement('ul')
    this.dropdown_menu.className = "dropdown_menu";

    this.dropdown_menu_private = this.document.createElement('a');
    this.dropdown_menu_private.setAttribute("href","private.html")
    this.dropdown_menu_private.innerHTML = "개인정보";

    this.dropdown_menu_logout = this.document.createElement('a');
    this.dropdown_menu_logout.innerHTML = "로그아웃"

    this.my_dialog = new MyDialogTwo(document,"진짜루?","확인","취소");
    this.my_dialog.setUI();

    this.my_request = new MyRequest();
  }
}