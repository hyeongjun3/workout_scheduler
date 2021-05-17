import '../styles/navTop.css';
import '../image/logo.png';
import '../image/user.png';

let myRequest = null;

/* Checking window object if it has my request module */
if (window.hasOwnProperty('myRequest') === false) {
  import('./request.js').then((module) => {
    myRequest = module.MyRequest;
  });
}

// <nav class="top-nav">
//   <div class="top-nav-left-group">
//     <img src="../image/logo.png" alt="" srcset="" />
//   </div>
//   <div class="top-nav-right-group">
//     <div class="dropdown">
//       <input type="image" src="../image/user.png" />
//       <div class="dropdown-content">
//         <button class="dropdown-item">로그아웃</button>
//         <button class="dropdown-item">개인정보 조회</button>
//       </div>
//     </div>
//   </div>
// </nav>

function TopNav() {
  this.body = this.getElement('body');

  this.topNav = this.createElement('nav', 'top-nav');
  {
    this.topNavLeftGroup = this.createElement('div', 'top-nav-left-group');
    {
      this.logo = this.createElement('img');
      this.logo.setAttribute('src', '../image/logo.png');
      this.topNavLeftGroup.appendChild(this.logo);
    }
    this.topNavRightGroup = this.createElement('div', 'top-nav-right-group');
    {
      this.dropdown = this.createElement('div', 'dropdown');
      {
        this.private = this.createElement('input');
        this.private.setAttribute('type', 'image');
        this.private.setAttribute('src', '../image/user.png');
        this.dropdownContent = this.createElement('div', 'dropdown-content');
        {
          this.dropDownItemLogOut = this.createElement(
            'button',
            'dropdown-item'
          );
          this.dropDownItemLogOut.innerHTML = '로그아웃';

          this.dropDownItemLogOut.addEventListener('click', () => {
            myRequest.signOut()
            .then(() => {
              window.location.href = "signIn.html";
            })
            .catch((err) => {
              console.error(err);
            })
          });

          this.dropDownItemReadPrivate = this.createElement(
            'button',
            'dropdown-item'
          );
          this.dropDownItemReadPrivate.innerHTML = '개인정보 조회';
        }
        this.dropdownContent.appendChild(this.dropDownItemLogOut);
        this.dropdownContent.appendChild(this.dropDownItemReadPrivate);
      }
      this.dropdown.appendChild(this.private);
      this.dropdown.appendChild(this.dropdownContent);
    }
    this.topNavRightGroup.appendChild(this.dropdown);
  }
  this.topNav.appendChild(this.topNavLeftGroup);
  this.topNav.appendChild(this.topNavRightGroup);

  this.body.appendChild(this.topNav);
}

TopNav.prototype.createElement = function (tag, ...classNameList) {
  console.debug(
    `[createElement]
                      tag : ${tag}, 
                      classNameList : ${classNameList}`.replace(/\n\s+/g, '')
  );

  const element = document.createElement(tag);
  classNameList = null ?? classNameList;
  classNameList.forEach((className) => {
    element.classList.add(className);
  });

  return element;
};

TopNav.prototype.getElement = function (selector) {
  const element = document.querySelector(selector);

  return element;
};

/* bind handler */
TopNav.prototype.bindDropDownItemReadPrivate = function (handler) {
  this.dropDownItemReadPrivate.addEventListener('click', () => {
    handler();
  });
};

export { TopNav };
