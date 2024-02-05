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
const link = document.getElementsByClassName("lin");

function dropDown() {
  content.style.visibility = "visible";
}
for (let i = 0; i <= link.length; i++) {
  link[i].addEventListener("click", () => {
    content.style.visibility = "hidden";
  });
}

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

  return isValidName && isValidEmail && isValidMessage;
}
/*  Blogs Horiziontal infinite slide*/
var copy = document.querySelector(".blogs").cloneNode(true);
document.querySelector(".blog-container").appendChild(copy);
