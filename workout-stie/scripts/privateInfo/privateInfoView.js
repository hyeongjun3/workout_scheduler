import '../../styles/privateInfo.css'

// <div class="private-info-top">
//     <button class="private-info-top-item">수정</button>
//     <button class="private-info-top-item">회원탈퇴</button>
// </div>
// <div class="private-info-window">
//     <div class="private-info-field-group">
//     <div class="private-info-field">
//         <label for="input-nickname">닉네임</label>
//         <input type="text" name="nickname" id="input-nickname"/>
//     </div>
//     <div class="private-info-field">
//         <label for="">성별</label>
//         <div class="private-info-field-radio">
//         <div class="private-info-field-inner">
//             <input type="radio" name="male" id="male" value="male" />
//             <label for="male">남자</label>
//         </div>
//         <div class="private-info-field-inner">
//             <input type="radio" name="female" id="female" value="female" />
//             <label for="female">여자</label>
//         </div>
//         </div>
//     </div>
//     <div class="private-info-button-group">
//         <button class="private-info-button">완료</button>
//         <button class="private-info-button">취소</button>
//     </div>
//     </div>
// </div>

function PrivateInfoView() {
  this.body = this.getElement('body');

  this.privateInfoTop = this.createElement('div', 'private-info-top');
  {
      this.privateInfoTopItemUpdate = this.createElement('button','private-info-top-item');
      this.privateInfoTopItemUpdate.innerHTML = '수정';
      this.privateInfoTopItemWithdrawal = this.createElement('button','private-info-top-item');
      this.privateInfoTopItemWithdrawal.innerHTML = '회원탈퇴';
  }
  this.privateInfoTop.appendChild(this.privateInfoTopItemUpdate);
  this.privateInfoTop.appendChild(this.privateInfoTopItemWithdrawal);

  this.privateInfoWindow = this.createElement('div','private-info-window');
  {
      this.privateInfoFieldGroup = this.createElement('div','private-info-field-group');
      {
          this.privateInfoFieldNickname = this.createElement('div','private-info-field');
          {
              this.nicknameLabel = this.createElement('label');
              this.nicknameLabel.setAttribute('for', 'input-nickname');
              this.nicknameLabel.innerHTML = '닉네임';
              this.nicknameInput = this.createElement('input');
              this.nicknameInput.setAttribute('type', 'text');
              this.nicknameInput.setAttribute('name' ,'nickname');
              this.nicknameInput.setAttribute('id', 'input-nickname');
          }
          this.privateInfoFieldNickname.appendChild(this.nicknameLabel);
          this.privateInfoFieldNickname.appendChild(this.nicknameInput);

          this.privateInfoFieldGender = this.createElement('div','private-info-field');
          {
              this.genderLabel = this.createElement('label');
              this.genderLabel.innerHTML = '성별';
              this.genderRadio = this.createElement('div', 'private-info-field-radio');
              {
                this.maleInner = this.createElement('div','private-info-field-inner');
                {
                    this.maleInput = this.createElement('input');
                    this.maleInput.setAttribute('type','radio');
                    this.maleInput.setAttribute('name','male');
                    this.maleInput.setAttribute('id','male');
                    this.maleInput.setAttribute('value','male');
                    this.maleLabel = this.createElement('label');
                    this.maleLabel.setAttribute('for', 'male');
                    this.maleLabel.innerHTML = '남자';
                }
                this.maleInner.appendChild(this.maleInput);
                this.maleInner.appendChild(this.maleLabel);

                this.femaleInner = this.createElement('div', 'private-info-field-inner');
                {
                    this.femaleInput = this.createElement('input');
                    this.femaleInput.setAttribute('type','radio');
                    this.femaleInput.setAttribute('name','female');
                    this.femaleInput.setAttribute('id','female');
                    this.femaleInput.setAttribute('value','female');
                    this.femaleLabel = this.createElement('label');
                    this.femaleLabel.setAttribute('for', 'female');
                    this.femaleLabel.innerHTML = '여자';
                }
                this.femaleInner.appendChild(this.femaleInput);
                this.femaleInner.appendChild(this.femaleLabel);
              }
              this.genderRadio.appendChild(this.maleInner);
              this.genderRadio.appendChild(this.femaleInner);
          }
          this.privateInfoFieldGender.appendChild(this.genderLabel);
          this.privateInfoFieldGender.appendChild(this.genderRadio);

          this.privateInfoButtonGroup = this.createElement('div', 'private-info-button-group');
          {
              this.privateInfoButtonConfirm = this.createElement('button','private-info-button');
              this.privateInfoButtonConfirm.innerHTML = '완료'
              this.privateInfoButtonCancel = this.createElement('button','private-info-button');
              this.privateInfoButtonCancel.innerHTML = '취소'
          }
          this.privateInfoButtonGroup.appendChild(this.privateInfoButtonConfirm);
          this.privateInfoButtonGroup.appendChild(this.privateInfoButtonCancel);
      }
      this.privateInfoFieldGroup.appendChild(this.privateInfoFieldNickname);
      this.privateInfoFieldGroup.appendChild(this.privateInfoFieldGender);
      this.privateInfoFieldGroup.appendChild(this.privateInfoButtonGroup);
  }
  this.privateInfoWindow.appendChild(this.privateInfoFieldGroup);

  this.body.appendChild(this.privateInfoTop);
  this.body.appendChild(this.privateInfoWindow);
}

PrivateInfoView.prototype.createElement = function (tag, ...classNameList) {
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

PrivateInfoView.prototype.getElement = function (selector) {
  const element = document.querySelector(selector);

  return element;
};


export {PrivateInfoView}; 