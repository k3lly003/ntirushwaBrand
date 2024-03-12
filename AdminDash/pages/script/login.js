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
  fetch("https://ntirushwabrand-bn-2.onrender.com/api/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status == 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("currentUser", data.user._id);
        localStorage.setItem("firstName", data.user.first_name);
        localStorage.setItem("secondName", data.user.second_name);
        localStorage.setItem("userType", data.user.userType);
        Toastify({
          text: data.msg,
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#a6a001",
          },
          onClick: function () {},
        }).showToast();
        setTimeout(() => {
          if (data.user.userType == "admin") {
            window.location.href = "/ntirushwaBrand/AdminDash/dash.html";
          } else {
            window.location.href = "/ntirushwaBrand/index.html";
          }
        }, 2000);
      } else {
        Toastify({
          text: data.msg || data.error,
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "blue",
          },
          onClick: function () {},
        }).showToast();
      }
    });
});
