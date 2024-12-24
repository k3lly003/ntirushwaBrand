fetch(`https://ntirushwabrand-bn-2.onrender.com/api/blogs`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    renderBlogs(data);
    console.log(data);
  });

/*Blog rendering*/

let blogList = [];
const date = new Date(blogList.createdAt);
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
  day < 10 ? "0" : ""
}${day}`;
console.log(formattedDate);
// renderBlogs();
function renderBlogs(data) {
  blogList = data;
  // console.log(blogList);
  for (let i = 0; i < blogList.length; i++) {
    let blogContainer = document.querySelector("#blog-container");
    let card = ` <div class="blog-one">
    <div class="blog-img">
     <img src="${blogList[i].image}" alt="blog-image"/>
    </div>
    <div class="blog-paragraphs">
      <div class="blog-paragraphs">
          <a href="/single-blog-view.html">
            <span>${blogList[i].formattedDate}</span>
          <h3>${blogList[i].title}</h3>
          <p>
            ${blogList[i].description}
          </p>
          </a>
        </div>
    </div>
    <div class="blog-buto">
      <button id="${blogList[i]._id}">Edit</button>
      <button onClick="deleteContent('${blogList[i]._id}')">Delete</button>
    </div>
  </div>`;
    blogContainer.insertAdjacentHTML("beforeend", card);
    let edit = document.getElementById(`${blogList[i]._id}`);
    edit.addEventListener("click", () => {
      window.location.href = `update-blog.html?id=${blogList[i]._id}`;
    });
  }
}

async function deleteContent(_id) {
  console.log("THIS IS THE ID", _id);
  let token = localStorage.getItem("token");
  console.log(" this is the token", token);
  try {
    const header = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    };
    console.log(header);
    let response = await fetch(
      `https://ntirushwabrand-bn-2.onrender.com/api/blogs/${_id}`,
      {
        method: "DELETE",
        headers: header,
      }
    );
    let data = await response.json();
    console.log(data);
    alert("MESSAGE DELETED SUCCESSFULLY");
  } catch (error) {
    console.log("THIS IS THE ERROR", error);
  }
  window.location.reload();
}

//update blog
function updateContent(_id) {
  window.location.href = `../update-blog.html?id=${_id}`;
}
