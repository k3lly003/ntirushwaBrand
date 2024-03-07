let parentdiv = document.getElementsByClassName("display-input")[0];
let childdiv = document.getElementsByClassName("child")[0];
let btn = document.getElementById("display");
let close = document.getElementsByClassName("no")[0];
let addLikes = document.getElementById("addLike");
let displayLikes = document.getElementById("displayLikes");
let comments = document.getElementById("addComment");
btn.addEventListener("click", () => {
  parentdiv.style.display = "block";
});
close.addEventListener("click", () => {
  parentdiv.style.display = "none";
});
/*singleBlog*/
const searchParams = new URLSearchParams(window.location.search);
const blogId = searchParams.get("id");
// let data = [];
// let = [];
// data = localStorage.getItem("blogs");
// blogList = JSON.parse(data);

//fetch
// const searchParams = new URLSearchParams(window.location.search);
// const blogId=searchParams.get('id');

fetch(`http://localhost:8000/api/blogs/${blogId}/read`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    document.getElementById("title").innerText = data.title;
    document.getElementById("date").innerText = data.createdAt;
    document.getElementById("image").setAttribute("src", data.image);
    document.getElementById("over-text").innerHTML = data.content;
    addLikes.addEventListener("click", () => {
      !addLikes == false
        ? (displayLikes.textContent = data.likes + 1)
        : (displayLikes.textContent = data.likes - 1);
    });
    const comment = data.comments;
    console.log(comment);
  });
