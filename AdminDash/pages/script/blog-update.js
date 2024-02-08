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
  // validateEditor(content);
});
const searchParams = new URLSearchParams(window.location.search);
const blogId = searchParams.get("id");
let data = [];
let blogList = [];
data = localStorage.getItem("blogs");
blogList = JSON.parse(data);
console.log(blogList[blogId]);
document.getElementById("title").value = blogList[blogId].title;
document.getElementById("date").value = blogList[blogId].date;
document.getElementById("description").value = blogList[blogId].description;
quill.root.innerHTML = blogList[blogId].content;
const form = document.getElementById("postForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // const formData = new formData(e.target);
  // const Title = formData.get("title");
  let title = document.getElementById("title").value;
  let date = document.getElementById("date").value;
  let description = document.getElementById("description").value;
  let content = quill.root.innerHTML;
  // console.log(title);
  // console.log(date);
  // console.log(content);
  const fileReader = new FileReader();
  fileReader.addEventListener("load", () => {
    const imgUrl = fileReader.result;
    blogList[blogId].content = content;
    blogList[blogId].date = date;
    blogList[blogId].title = title;
    blogList[blogId].image = imgUrl;
    blogList[blogId].description = description;
    localStorage.setItem("blogs", JSON.stringify(blogList));
    window.location.href = "./blogs.html";
  });
  fileReader.readAsDataURL(document.querySelector("input[type=file]").files[0]);
});
