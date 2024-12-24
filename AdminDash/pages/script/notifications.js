fetch(`https://ntirushwabrand-bn-2.onrender.com/api/messages`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    renderMessages(data);
    console.log(data);
  });

/*MESSAGE RENDERING*/
let messageList = [];
const messageContainer = document.querySelector(".msgs");
// RENDERMESSAGES;

function renderMessages(data) {
  messageList = data;
  const NumberOfMessages = document.querySelector(".msgs");
  NumberOfMessages.innerHTML = messageList.length;
  for (let i = 0; i < messageList.length; i++) {
    let messageCard = `<div class="msg-card">
          <div class="text">
            <div class="acnt-em">
              <i class="fa fa-user" aria-hidden="true"></i>
              <h4>${messageList[i].email}</h4>
            </div>
            <p>${messageList[i].text}</p>
         </div>
     </div>`;
    messageContainer.insertAdjacentHTML("beforeend", messageCard);
  }
}
