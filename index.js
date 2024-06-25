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

/*Hamburger */
const content = document.getElementById("content");
const link = document.querySelectorAll(".lin");

function dropDown() {
  content.style.visibility = "visible";
}

for (let i = 0; i < link.length; i++) {
  link[i].addEventListener("click", () => {
    content.style.visibility = "hidden";
  });
}

/*accessing css*/
let blogCont = document.querySelector(".blog-container");
blogCont.classList.add("blog-container");

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
    errOne.style.color = "red";
    errOne.innerHTML = "Name cannot be empty";
    return false;
  } else {
    errOne.innerHTML = "";
    return true;
  }
}

function validateEmail() {
  var emailInput = document.getElementById("email").value;
  var errTwo = document.getElementById("error-two");
  if (emailInput.trim() === "") {
    errTwo.style.color = "red";
    errTwo.innerHTML = "Email cannot be empty";
    return false;
  } else if (!is_valid_email(emailInput)) {
    errTwo.style.color = "red";
    errTwo.innerHTML = "Invalid email address";
    return false;
  } else {
    errTwo.innerHTML = "";
    return true;
  }
}

function validateMessage() {
  var messageInput = document.getElementById("message").value;
  var errThree = document.getElementById("error-three");

  if (messageInput.trim() === "") {
    errThree.style.color = "red";
    errThree.innerHTML = "Message cannot be empty";
    return false;
  } else if (messageInput.length < 5) {
    errThree.style.color = "red";
    errThree.innerHTML = "Message should not exceed 4 characters";
    return false;
  } else {
    errThree.innerHTML = "";
    return true;
  }
}

function validateForm() {
  var isValidName = validateName();
  var isValidEmail = validateEmail();
  var isValidMessage = validateMessage();

  return isValidName && isValidEmail && isValidMessage;
}

/*Blog rendering*/
let blogList = [];

const blogContainer = document.querySelector(".blogs");

async function fetchBlogs() {
  try {
    const response = await fetch("https://ntirushwabrand-bn-2.onrender.com/api/blogs");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    localStorage.setItem("blogs", JSON.stringify(data));
    blogList = data;
    console.log("kkkkkkkkk",blogList)
    renderBlogs();
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
}
function renderBlogs() {
  blogContainer.innerHTML = ""; // Clear the container first
  for (let i = 0; i < blogList.length; i++) {
    let card = `
      <div class="child">
        <div class="blog-img">
          <img src="${blogList[i].image}" alt="">
        </div>
        <a href="./single-blog-view.html?id=${i}">
          <div>
            <div class="up">
              <p>${blogList[i].title}</p>
            </div>
            <div class="low">
              <p>${blogList[i].description}</p>
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

fetchBlogs();
