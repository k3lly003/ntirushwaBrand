fetch(`http://localhost:8000/api/messages`)
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
        <a href="./ViewMessage.html?id=${messageList[i]._id}">
          <div class="text">
            <div class="acnt-em">
              <i class="fa fa-user" aria-hidden="true"></i>
              <h4>${messageList[i].email}</h4>
            </div>
            <p>${messageList[i].text}</p>
         </div>
       </a>
       <div class="del-cont"><p class="delete" onclick="handleDelete()">Delete</p></div>
     </div>`;
    messageContainer.insertAdjacentHTML("beforeend", messageCard);
  }
}
function handleDelete(_id) {
  // console.log("THIS IS THE ID", _id);
  let tkn = localStorage.getItem("token");
  const token = JSON.parse(tkn);
  console.log(" this is the token", token);
  fetch(`http://localhost:8000/api/messages/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert(`Your account has !`);
      window.location.href = "./login.html";
    });
  location.reload();
}
// function showSingleBlog(id) {
//   localStorage.setItem("currentId", id);
//   window.location.href = "./single-blog-view.html";
// }
