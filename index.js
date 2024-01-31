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
let dropdown = document.getElementsByClassName()[0];
dropdown;
/* Landing page form validation*/
function is_valid_email(email) {
  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}
function validateForm() {
  var nameInput = document.getElementById("name").value;
  var emailInput = document.getElementById("email").value;
  var messageInput = document.getElementById("message").value;
  if (nameInput.trim() === "") {
    alert("Name cannot be empty");
    return false;
  } else if (emailInput.trim() === "") {
    alert("Your email is empty");
  } else if (!is_valid_email(emailInput)) {
    alert("Invalid email address");
  } else if (messageInput.trim() === "") {
    alert("Password cannot be empty");
  } else if (messageInput.length < 5) {
    alert("Message should not exceed 4 characters");
  }
  window.location.href = "./index.html#contact";
  return false;
}
/*  Blogs Horiziontal infinite slide*/
var copy = document.querySelector(".blogs").cloneNode(true);
document.querySelector(".blog-container").appendChild(copy);
