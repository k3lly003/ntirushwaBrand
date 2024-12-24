/*text editor validation*/

var quill = new Quill("#editor", {
  theme: "snow",
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["link", "image", "video"],
      ["clean"],
    ],
  },
});
function validateTitle() {
  var titleInput = document.getElementById("title").value;
  var errTwo = document.getElementById("error-two");

  if (titleInput.trim() === "") {
    errTwo.style.color = "red";
    errTwo.innerHTML = "Title cannot be empty";
    return false;
  } else {
    errTwo.innerHTML = "";
  }
}
function validateDescription() {
  var descriptionInput = document.getElementById("description").value;
  var errFour = document.getElementById("error-four");

  if (descriptionInput.trim() === "") {
    errFour.style.color = "red";
    errFour.innerHTML = "You have to add a descrition";
    return false;
  } else {
    errFour.innerHTML = "";
    return true;
  }
}
function validateImage() {
  var imageInput = document.getElementById("image").value;
  var errThree = document.getElementById("error-three");

  if (imageInput.trim() === "") {
    errThree.style.color = "red";
    errThree.innerHTML = "You have to add an image";
    return false;
  } else {
    errThree.innerHTML = "";
    return true;
  }
}
function validateContent() {
  var contentInput = quill.root.innerHTML.value;
  var errFive = document.getElementById("error-five");

  if (contentInput.trim() === "") {
    errFive.style.color = "red";
    errFive.innerHTML = "You have to fill the blog input";
    return false;
  } else {
    errFive.innerHTML = "";
    return true;
  }
}
document
  .getElementById("postForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const image = document.getElementById("image").files[0];
    const content = quill.root.innerHTML;
    const description = document.getElementById("description").value;
    console.log("this is the content", content);
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    form.append("content", content);
    form.append("description", description);

    let tkn = localStorage.getItem("token");
    console.log(tkn, "is this token");
    const header = {
      Authorization: "Bearer " + tkn,
    };

    try {
      await fetch(`https://ntirushwabrand-bn-2.onrender.com/api/blogs`, {
        method: "POST",
        headers: header,
        body: form,
      })
        .then((res) => res.json())
        .then((data) => {
          if (
            !validateImage() &&
            !validateTitle() &&
            !validateDescription() &&
            !validateContent()
          ) {
            return (
              validateImage() &&
              validateTitle() &&
              validateContent() &&
              validateDescription()
            );
          } else {
            window.location.href =
              "http://192.168.1.129:5501/ntirushwaBrand/AdminDash/pages/blogs.html";
          }
        })
        .catch((error) => {
          console.log("THIS IS THE ERROR", error);
        });
    } catch (err) {
      console.log(err);
    }
  });
