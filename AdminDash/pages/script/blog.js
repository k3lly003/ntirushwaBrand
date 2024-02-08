let data = [];
let blogList = [];
console.log(blogList);
const blogContainer = document.getElementById("blog-container");
renderBlogs();
function renderBlogs() {
  data = localStorage.getItem("blogs");
  blogList = JSON.parse(data);
  for (let i = 0; i < blogList.length; i++) {
    // const { image, date, title, descritpion } = blogList[i];
    // console.log(date.date);
    console.log(blogList[i]);
    let card = ` <div class="blog-one">
    <div class="blog-img">
     <img src="${blogList[i].image}" alt="blog-image"/>
    </div>
    <div class="blog-paragraphs">
      <div class="blog-paragraphs">
          <a href="/single-blog-view.html">
            <span>${blogList[i].date}</span>
          <h3>${blogList[i].title}</h3>
          <p>
            ${blogList[i].description}
          </p>
          </a>
        </div>
    </div>
    <div class="blog-buto">
      <button onclick="updateContent(${i})">Edit</button>
      <button onclick="deleteContent(${i})">Delete</button>
    </div>
  </div>`;
    blogContainer.insertAdjacentHTML("beforeend", card);
  }
}
function updateContent(title) {
  // console.log(title);
  window.location.href = `./update-blog.html?id=${title}`;
}
function deleteContent(index) {
  blogList.splice(index, 1);
  localStorage.setItem("blogs", JSON.stringify(blogList));
  // renderBlogs();
  location.reload();
}
