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
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var title = document.getElementById("title").value;
    var content = quill.root.innerHTML;
    var data = {
      content: content,
      title: title,
    };
    console.log("Content:", data);
    let Result = JSON.stringify(data);
    localStorage.setItem("name", Result);
    document.getElementById("postForm").reset();
    quill.setText("");
  });
document.getElementById("date").addEventListener("input", validateDate);
document.getElementById("title").addEventListener("input", validateTitle);

function validateDate() {
  var DateInput = document.getElementById("date").value;
  var errOne = document.getElementById("error-one");

  if (DateInput.trim() === "") {
    errOne.style = "color: red";
    errOne.innerHTML = "Date cannot be empty";
    return false;
  } else {
    errOne.innerHTML = "";
  }
}
function validateTitle() {
  var titleInput = document.getElementById("title").value;
  var errTwo = document.getElementById("error-two");

  if (titleInput.trim() === "") {
    errTwo.style = "color: red";
    errTwo.innerHTML = "title cannot be empty";
    return false;
  } else {
    errTwo.innerHTML = "";
  }
}
/*Saving the content in local storage*/
const textEditor = document.getElementById("editor");
textEditor.addEventListener("onchange", function () {
  const content = quill.root.innerHTML;
  validateEditor(content);
  console.log("textEditor output", content);
});
function validateEditor(content) {
  var errThree = document.getElementById("error-three");

  if (content.trim() === "") {
    errThree.style = "color: red";
    errThree.innerHTML = "Blog cannot be empty";
    return false;
  } else if (content.length < 200) {
    errThree.style = "color: red";
    errThree.innerHTML = "Blog must be at least 200 characters long.";
    return false;
  } else {
    errThree.innerHTML = "";
  }
}
function validateForm() {
  var isValidDate = validateDate();
  var isValidTitle = validateTitle();
  var isValidBlog = validateEditor(content);
  if (isValidDate && isValidTitle && isValidBlog) {
    alert("Successfully done !!");
    return true;
  } else {
    return false;
  }
}
