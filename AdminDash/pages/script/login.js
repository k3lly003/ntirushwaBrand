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
    errTwo.innerHTML = "Required a strong password of at least 5 characters";
    return false;
  } else {
    errTwo.innerHTML = "";
  }
  window.location.href = "./dash.html";
}

function validateForm() {
  var isValidName = validateName();
  var isValidPassword = validatePassword();

  return isValidName && isValidPassword;
}
