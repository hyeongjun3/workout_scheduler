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

// Todo mydialog object 또는 class 만들기

var my_dialog = document.createElement("dialog")
my_dialog.className = "my_dialog"

const my_dialog_message = document.createElement("p")
my_dialog_message.innerHTML = "Message!!"

const my_dialog_form_actions = document.createElement("div")
my_dialog_form_actions.className = "dialog_form_actions"

const my_dialog_form_cancel = document.createElement("button")
my_dialog_form_cancel.className = "dialog_form_cancel"
my_dialog_form_cancel.innerHTML = "확인"
my_dialog_form_cancel.addEventListener('click', event => {
  console.log('Cancel!');
  my_dialog.close();
});


my_dialog.appendChild(my_dialog_message)
my_dialog.appendChild(my_dialog_form_actions)
my_dialog_form_actions.appendChild(my_dialog_form_cancel)

document.querySelector('body').appendChild(my_dialog)
