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
document.getElementById("editor").addEventListener("input", function () {
  const content = quill.root.innerHTML;
  validateEditor(content);
});
document
  .getElementById("postForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var title = document.getElementById("title").value;
    var image = document.getElementById("image").value;
    var content = quill.root.innerHTML;
    var description = document.getElementById("description").value;
    // Retrieve existing data from local storage
    // var existingData = localStorage.getItem("blogs");
    // var existingBlogs = existingData ? JSON.parse(existingData) : [];

    // Add the new blog to the existing blogs
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      // console.log(fileReader.result);
      const imgUrl = fileReader.result;
      // var newBlog = {
      //   title: title,
      //   image: imgUrl,
      //   content: content,
      //   description: description,
      // };
      // existingBlogs.push(newBlog);

      // Save the updated blogs array to local storage
      localStorage.setItem("blogs", JSON.stringify(existingBlogs));
    });
    fileReader.readAsDataURL(
      document.querySelector("input[type=file]").files[0]
    );
    document.getElementById("postForm").reset(); // reset the form
    quill.setText("");
  });

document.getElementById("title").addEventListener("input", validateTitle);

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

const textEditor = document.getElementById("editor");
textEditor.addEventListener("input", function () {
  const content = quill.root.innerHTML;
  validateEditor(content);
  console.log("textEditor output", content);
});

function validateEditor(content) {
  var errFour = document.getElementById("error-four");

  if (content.length < 10) {
    errFour.style.color = "red";
    errFour.innerHTML = "Blog must be at least 10 characters long.";
    return false;
  } else {
    errFour.innerHTML = "";
  }

  return true;
}

function validateForm() {
  var isValidDate = validateDate();
  var isValidTitle = validateTitle();
  var isValidImage = validateImage();
  var content = quill.root.innerHTML;
  var isValidBlog = validateEditor(content);
  if (isValidDate && isValidTitle && isValidImage && isValidBlog) {
    alert("Successfully done!!");
    return true;
  } else {
    return false;
  }
}

//INTEGRATION CREATE BLOG

const createBlogPost = async () => {
  //getting input values
  const title = document.getElementById("title").value;
  const image = document.getElementById("image").value;
  const content = quill.root.innerHTML;
  const description = document.getElementById("description").value;

  const url = "https://your-backend-api.com/api/blogs";

  try {
    const response = await axios.post(url, {
      title,
      image,
      description,
      content,
    });
    // return response.data;
    console.log("THE BLOG HAVE BEEN CREATED SUCCESFULLY", response.data);
  } catch (error) {
    throw new Error("Failed to create blog post");
  }
};

// Usage example
// createBlogPost("New Blog Post", "This is the content of the new blog post")
//   .then((data) => {
//     console.log("Blog post created:", data);
//     // Handle the response data as needed
//   })
//   .catch((error) => {
//     console.error("Error creating blog post:", error);
//     res;
//   });
