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
});
const searchParams = new URLSearchParams(window.location.search);
const blogId = searchParams.get("id");
console.log(blogId);
let data = [];
let blogList = [];
console.log(blogList[blogId]);

//UPDATE
fetch(`https://ntirushwabrand-bn-2.onrender.com/api/blogs/${blogId}`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    //FORMATING THE DATE
    const date = new Date(data.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
    //DISPALYING THE BLOG ON THE PAGE
    document.getElementById("title").value = data.title;
    document.getElementById("description").value = data.description;
    document.getElementById("date").value = formattedDate;
    console.log("ssssssssssssssssss", data.content);
    quill.root.innerHTML = data.content;
    document.getElementById("image").setAttribute("src", data.image);
    let updateSingleBlog = document.getElementById("updateSingleBlog");
    updateSingleBlog.addEventListener("click", async (e) => {
      e.preventDefault();
      let tkn = localStorage.getItem("token");
      console.log(tkn, "is this token");
      const header = {
        Authorization: "Bearer " + tkn,
        "Content-Type": "application/json",
      };
      const title = document.getElementById("title").value;
      const image = document.getElementById("image").files[0];
      const content = quill.root.innerHTML;
      const description = document.getElementById("description").value;
      const newData = {
        title: title,
        content: content,
        description: description,
      };

      try {
        await fetch(
          `https://ntirushwabrand-bn-2.onrender.com/api/blogs/${blogId}`,
          {
            method: "PATCH",
            headers: header,
            body: JSON.stringify(newData),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            window.location.href =
              "http://192.168.1.129:5501/ntirushwaBrand/AdminDash/pages/blogs.html";
          })
          .catch((error) => {
            console.log("THIS IS THE ERROR", error);
          });
      } catch (err) {
        console.log(err);
      }
    });
  });
