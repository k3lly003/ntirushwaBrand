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
  // window.location.href = "./index.html#contact";
}
//CREATING A MESAGE

document
  .getElementById("addMessage")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const userName = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const obj = {
      name: userName,
      email: email,
      text: message,
    };
    fetch(`https://ntirushwabrand-bn-2.onrender.com/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("MESSAGE SENT!");
        console.log(data);
        window.location.reload();
      });
  });
