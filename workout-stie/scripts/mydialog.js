
/*
  <dialog class="my_dialog">
    <p>Message</p>
    <div class="dialog_form_actions">
      <button class="dialog_form_cancel">
        확인
      </button>
    </div>
  </dialog>
*/

class MyDialogOne {
  constructor(document,message, cancel_string) {
    this.document = document;
    this.message = message;
    this.cancel_string = cancel_string;
  }

  setUI() {
    this.setField();
    this.setListener();
    this.combination();
  }

  combination() {
    this.my_dialog_form_actions.appendChild(this.my_dialog_form_cancel);

    this.my_dialog.appendChild(this.my_dialog_message);
    this.my_dialog.appendChild(this.my_dialog_form_actions);

    this.document.querySelector('body').appendChild(this.my_dialog);
  }

  setListener() {
    this.my_dialog_form_cancel.addEventListener('click', event => {
      this.my_dialog.close();
    })
  }

  setField() {
    this.my_dialog = this.document.createElement('dialog');
    this.my_dialog.className = 'my_dialog';

    this.my_dialog_message = this.document.createElement('p');
    this.my_dialog_message.innerHTML = this.message;

    this.my_dialog_form_actions = this.document.createElement('div');
    this.my_dialog_form_actions.className = 'dialog_form_actions';

    this.my_dialog_form_cancel = this.document.createElement('button');
    this.my_dialog_form_cancel.className = 'dialog_form_cancel';
    this.my_dialog_form_cancel.innerHTML = this.cancel_string;
  }

  showModal() {
    this.my_dialog.showModal();
  }

  setMessage(message) {
    console.log(this.my_dialog_message);
    this.my_dialog_message.innerHTML = message;
  }
}
// Todo mydialog object 또는 class 만들기

// var my_dialog = document.createElement("dialog")
// my_dialog.className = "my_dialog"

// const my_dialog_message = document.createElement("p")
// my_dialog_message.innerHTML = "Message!!"

// const my_dialog_form_actions = document.createElement("div")
// my_dialog_form_actions.className = "dialog_form_actions"

// const my_dialog_form_cancel = document.createElement("button")
// my_dialog_form_cancel.className = "dialog_form_cancel"
// my_dialog_form_cancel.innerHTML = "확인"
// my_dialog_form_cancel.addEventListener('click', event => {
//   console.log('Cancel!');
//   my_dialog.close();
// });

// my_dialog.appendChild(my_dialog_message)
// my_dialog.appendChild(my_dialog_form_actions)
// my_dialog_form_actions.appendChild(my_dialog_form_cancel)

// document.querySelector('body').appendChild(my_dialog)

/*
<dialog class="my_dialog">
  <p>진짜?</p>
  <div class="dialog_form_actions">
    <button class="dialog_form_ok">확인</button>
    <button class="dialog_form_cancel">취소</button>
  </div>
</dialog>
*/

class MyDialogTwo {
  constructor(document,message, ok_string, cancel_string) {
    this.document = document;
    this.message = message;
    this.ok_string = ok_string;
    this.cancel_string = cancel_string;
  }

  setUI () {
    this.setField();
    this.setListener();
    this.combination();
  }

  combination() {
    this.my_dialog_flex.appendChild(this.my_dialog_ok);
    this.my_dialog_flex.appendChild(this.my_dialog_cancel);

    this.my_dialog.appendChild(this.main_message);
    this.my_dialog.appendChild(this.my_dialog_flex);

    this.document.querySelector('body').appendChild(this.my_dialog);
  }

  setListener() {
    this.my_dialog_cancel.addEventListener('click', event => {
      this.my_dialog.close();
    })
  }

  setField() {
    this.my_dialog = this.document.createElement('dialog');
    this.my_dialog.className = 'my_dialog';
    
    this.main_message = this.document.createElement('p');
    this.main_message.innerHTML = this.message;

    this.my_dialog_flex = this.document.createElement('div');
    this.my_dialog_flex.className = 'dialog_form_actions';

    this.my_dialog_ok = this.document.createElement('button');
    this.my_dialog_ok.className = 'dialog_form_ok';
    this.my_dialog_ok.innerHTML = this.ok_string;
    
    this.my_dialog_cancel = this.document.createElement('button');
    this.my_dialog_cancel.className = 'dialog_form_cancel';
    this.my_dialog_cancel.innerHTML = this.cancel_string
  }

  setOkListener(func) {
    this.my_dialog_ok.addEventListener('click', func);
  }

  showModal() {
    this.my_dialog.showModal();
  }
}

export {MyDialogOne, MyDialogTwo};
