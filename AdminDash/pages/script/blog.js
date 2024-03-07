fetch(`http://localhost:8000/api/blogs`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    renderBlogs(data);
    console.log(data);
  });

/*Blog rendering*/

let blogList = [];
// renderBlogs();
function renderBlogs(data) {
  blogList = data;
  // console.log(blogList);
  for (let i = 0; i < blogList.length; i++) {
    // const { image, date, title, descritpion } = blogList[i];
    // console.log(date.date);
    console.log(blogList[i]);
    let blogContainer = document.querySelector("#blog-container");
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
      <button onclick="updateContent(${blogList[i]._id})">Edit</button>
      <button onclick="deleteContent('${blogList[i]._id}')">Delete</button>
    </div>
  </div>`;
    blogContainer.insertAdjacentHTML("beforeend", card);
  }
}
// function showSingleBlog(id) {
//   localStorage.setItem("currentId", id);
//   window.location.href = "./single-blog-view.html";
// }
function updateContent(title) {
  window.location.href = `./update-blog.html?id=${title}`;
}
function deleteContent(_id) {
  // console.log("THIS IS THE ID", _id);
  let tkn = localStorage.getItem("token");
  const token = JSON.parse(tkn);
  console.log(" this is the token", token);
  fetch(`http://localhost:8000/api/blogs/${_id}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert(`Your account has !`);
      window.location.href = "./login.html";
    });
  location.reload();
}
