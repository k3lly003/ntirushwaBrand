/*singleBlog*/
const searchParams = new URLSearchParams(window.location.search);
const blogId = searchParams.get("id");

fetch(`https://ntirushwabrand-bn-2.onrender.com/api/blogs/${blogId}`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    document.getElementById("displayLikes").innerText = data.likes.length;
    //FORMATING THE DATE
    const date = new Date(data.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
    //DISPALYING THE BLOG ON THE PAGE
    document.getElementById("title").innerText = data.title;
    document.getElementById("over-text").innerText = data.content;
    document.getElementById("date").innerText = formattedDate;
    document.getElementById("image").setAttribute("src", data.image);
    // document.getElementById("userName").innerText =
    // data.comments[0].author.first_name;
    //displaying all comments
    console.log("THIS IS THE COMMENTS", data.comment);
    let commentList = "";
    data.comments.forEach((comment) => {
      console.log("FOREACH COMMENT", comment);
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");
      commentList += `<div class="personal-comment">
      <h3 id="userName">${comment.author.first_name}</h3>
      <p id="userIdea">${comment.message}</p>
    </div>`;
    });
    document.getElementById("comments").innerText = data.comments.length;
    document.getElementById("commentContent").innerHTML = commentList;
    likes = data.likes;
    console.log("THIS IS THE LIKES", likes);
  });

//CREATING A COMMENT
let messageInput = document.getElementById("child");
let container = document.getElementById("display");
let sendMessageBtn = document.getElementById("addComment");

sendMessageBtn.addEventListener(
  "click",
  (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const data = {
      message: messageInput.value,
    };
    console.log("THIS IS THE MESSAGE INPUT VALUE", data);
    fetch(
      `https://ntirushwabrand-bn-2.onrender.com/api/blog/${blogId}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        location.reload();
      })
      .catch((err) => console.error(err));
  }
  // }
);

//CREATING LIKE & DISLIKE
let addLike = document.getElementById("addLikeOnBlog");
let displayLikes = document.getElementById("displayLikes");
addLike.addEventListener("click", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please Log In To Like This Blog Post.");
    console.log("Please Log In To Like This Blog Post.");
  }
  fetch(`https://ntirushwabrand-bn-2.onrender.com/api/blogs/${blogId}/like`, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      Window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
});
