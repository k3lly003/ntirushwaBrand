function is_valid_email(email) {
  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}
document.getElementById("name").addEventListener("input", validateName);
document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("pass").addEventListener("input", validatePassword);

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
  if (!is_valid_email(emailInput)) {
    errTwo.style = "color: red";
    errTwo.innerHTML = "Invalid email address";
    return false;
  } else {
    errTwo.innerHTML = "";
  }
}
function validatePassword() {
  var passwordInput = document.getElementById("pass").value;
  var errThree = document.getElementById("error-three");

  if (passwordInput.trim() === "") {
    errThree.style = "color: red";
    errThree.innerHTML = "Password cannot be empty";
    return false;
  } else if (passwordInput.length < 5) {
    errThree.style = "color: red";
    errThree.innerHTML = "Required password of atleast 4 characters";
    return false;
  } else {
    errThree.innerHTML = "";
  }
  window.location.href = "./login.html";
}
function validateForm() {
  var isValidName = validateName();
  var isValidEmail = validateEmail();
  var isValidMessage = validatePassword();

  return isValidName && isValidEmail && isValidMessage;
}
