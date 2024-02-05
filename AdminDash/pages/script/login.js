document.getElementById("name").addEventListener("input", validateName);
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
function validatePassword() {
  var passwordInput = document.getElementById("pass").value;
  var errTwo = document.getElementById("error-two");

  if (passwordInput.trim() === "") {
    errTwo.style = "color: red";
    errTwo.innerHTML = "Password cannot be empty";
    return false;
  } else if (passwordInput.length < 5) {
    errTwo.style = "color: red";
    errTwo.innerHTML = "required a strong password of atleast 5 words";
    return false;
  } else {
    errTwo.innerHTML = "";
  }
  window.location.href = "./dash.html";
}
function validateForm() {
  var isValidName = validateName();
  var isValidMessage = validatePassword();

  return isValidName && isValidMessage;
}
