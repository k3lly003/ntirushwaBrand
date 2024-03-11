function is_valid_email(email) {
  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

// document.getElementById("name").addEventListener("input");
// document.getElementById("email").addEventListener("input");
// document.getElementById("pass").addEventListener("input");

const signupForm = document.querySelector("#signup");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // function validateName() {
  //   var nameInput = document.getElementById("name").value;
  //   var errOne = document.getElementById("error-one");

  //   if (nameInput.trim() === "") {
  //     errOne.style = "color: red";
  //     errOne.innerHTML = "Name cannot be empty";
  //     return false;
  //   } else {
  //     errOne.innerHTML = "";
  //     return true;
  //   }
  // }

  // function validateEmail() {
  //   var emailInput = document.getElementById("email").value;
  //   var errTwo = document.getElementById("error-two");

  //   if (!is_valid_email(emailInput)) {
  //     errTwo.style = "color: red";
  //     errTwo.innerHTML = "Invalid email address";
  //     return false;
  //   } else {
  //     errTwo.innerHTML = "";
  //     axios
  //       .get(`http://localhost:8000/api/auth/${emailInput}`)
  //       .then((response) => {
  //         if (response.data.exists) {
  //           errTwo.style = "color: red";
  //           errTwo.innerHTML = "User already exists";
  //         } else {
  //           errTwo.innerHTML = "";
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error checking email:", error);
  //         errTwo.innerHTML = "";
  //       });

  //     return true;
  //   }
  // }

  // function validatePassword() {
  //   var passwordInput = document.getElementById("pass").value;
  //   var errThree = document.getElementById("error-three");

  //   if (passwordInput.trim() === "") {
  //     errThree.style = "color: red";
  //     errThree.innerHTML = "Password cannot be empty";
  //     return false;
  //   } else if (passwordInput.length < 5) {
  //     errThree.style = "color: red";
  //     errThree.innerHTML = "Required password of at least 5 characters";
  //     return false;
  //   } else {
  //     errThree.innerHTML = "";
  //     return true;
  //   }
  // }

  // function validateForm() {
  // var isValidName = validateName();
  // var isValidEmail = validateEmail();
  // var isValidMessage = validatePassword();

  // if (isValidName && isValidEmail && isValidMessage) {
  const firstName = document.getElementById("firstName").value;
  const secondName = document.getElementById("secondName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  const data = {
    firstName,
    secondName,
    email,
    password,
  };
  console.log(data);
  fetch("http://localhost:8000/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert(`Your account has been created!`);
      window.location.href = "./login.html";
    });
  // }
  // return isValidName && isValidEmail && isValidMessage;
  // }
  // signupForm.reset();
});
