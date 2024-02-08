let parentdiv = document.getElementsByClassName("display-input")[0];
let childdiv = document.getElementsByClassName("child")[0];
let btn = document.getElementById("display");
let close = document.getElementsByClassName("no")[0];
btn.addEventListener("click", () => {
  parentdiv.style.display = "block";
});
close.addEventListener("click", () => {
  parentdiv.style.display = "none";
});
/*singleBlog*/
const searchParams = new URLSearchParams(window.location.search);
const blogId = searchParams.get("id");
let data = [];
let blogList = [];
data = localStorage.getItem("blogs");
blogList = JSON.parse(data);
document.getElementById("title").innerText = blogList[blogId].title;
document.getElementById("date").innerText = blogList[blogId].date;
document.getElementById("image").setAttribute("src", blogList[blogId].image);
document.getElementById("over-text").innerHTML = blogList[blogId].content;
