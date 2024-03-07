const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll("section");
hiddenElements.forEach((el) => observer.observe(el));
/*Humburger */
const content = document.getElementById("content");
const link = document.querySelectorAll(".lin");
console.log(link);
function dropDown() {
  content.style.visibility = "visible";
}
for (let i = 0; i < link.length; i++) {
  link[i].addEventListener("click", () => {
    content.style.visibility = "hidden";
  });
}
/*accessing css*/
// let blogCont = document
//   .querySelector(".blog-container")
//   .classList.add("blog-container");
// let blogs = document.querySelector(".blogs").classList.add("blogs");
// let child = document.querySelector(".child").classList.add("child");
// let feed = document.querySelector(".feed").classList.add("feed");

/* Landing page form validation*/
function is_valid_email(email) {
  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}
document.getElementById("name").addEventListener("input", validateName);
document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("message").addEventListener("input", validateMessage);

function validateName() {
  var nameInput = document.getElementById("name").value;
  var errOne = document.getElementById("error-one");

  if (nameInput.trim() === "") {
    errOne.style = "color: red";
    errOne.innerHTML = "Name cannot be empty";
    return false;
  } else {
    errOne.innerHTML = "";
  }
}
function validateEmail() {
  var emailInput = document.getElementById("email").value;
  var errTwo = document.getElementById("error-two");
  if (emailInput.trim() === "") {
    errTwo.style = "color: red";
    errTwo.innerHTML = "Email cannot be empty";
    return false;
  } else if (!is_valid_email(emailInput)) {
    errTwo.style = "color: red";
    errTwo.innerHTML = "Invalid email address";
    return false;
  } else {
    errTwo.innerHTML = "";
  }
}
function validateMessage() {
  var messageInput = document.getElementById("message").value;
  var errThree = document.getElementById("error-three");

  if (messageInput.trim() === "") {
    errThree.style = "color: red";
    errThree.innerHTML = "Message cannot be empty";
    return false;
  } else if (messageInput.length < 5) {
    errThree.style = "color: red";
    errThree.innerHTML = "Message should not exceed 4 characters";
    return false;
  } else {
    errThree.innerHTML = "";
  }
  window.location.href = "./index.html#contact";
}
function validateForm() {
  var isValidName = validateName();
  var isValidEmail = validateEmail();
  var isValidMessage = validateMessage();
  var handle;

  return isValidName && isValidEmail && isValidMessage;
}
fetch(`http://localhost:8000/api/blogs`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    renderBlogs(data);
    console.log(data);
  });

/*Blog rendering*/

let blogList = [];
const blogContainer = document.querySelector(".blogs");
// renderBlogs();
function renderBlogs(data) {
  blogList = data;
  // console.log(blogList);
  for (let i = 0; i < blogList.length; i++) {
    let card = ` <div class="child">
    <div class="blog-img">
      <img src="${blogList[i].image}" alt="">
    </div>
    <a href="./single-blog-view.html?id=${blogList[i]._id}">
      <div>
       <div class="up">
         <p>${blogList[i].title}</p>
       </div>
       <div class="low">
         <p>
          ${blogList[i].description}
         </p>
       </div>
     </div>
    </a>
    <div class="feed">
      <div class="like">
        <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
        <p>27</p>
      </div>
     <div class="come">
        <i class="fa fa-comment-o" aria-hidden="true"></i>
        <p>11</p>
       </div>
     </div>
   </div>`;
    blogContainer.insertAdjacentHTML("beforeend", card);
  }
}
function showSingleBlog(id) {
  localStorage.setItem("currentId", id);
  window.location.href = "./single-blog-view.html";
}
