function is_valid_email(email) {
  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

const signinForm = document.querySelector("#signin");
signinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  const data = {
    email,
    password,
  };
  console.log(data);
  fetch("http://localhost:8000/api/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.userType);
      localStorage.setItem("token", JSON.stringify(data.token));
      if (data.userType == "admin") {
        window.location.href = "./dash.html";
        alert(`WELCOME TO YOUR DASHBOARD!`);
      } else {
        window.location.href = "../index.html";
      }
    });
});
