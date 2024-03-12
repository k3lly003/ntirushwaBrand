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
      // "Content-Type": "application/json",
    };

    try {
      await fetch(`https://ntirushwabrand-bn-2.onrender.com/api/blogs`, {
        method: "POST",
        headers: header,
        body: form,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log("THIS IS THE ERROR", error);
        });
    } catch (err) {
      console.log(err);
    }

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
  });
