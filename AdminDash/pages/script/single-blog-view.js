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
    document.getElementById("userName").innerText =
      data.comments[0].author.first_name;
    //displaying all comments
    data.comments.forEach((comment) => {
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");
      commentElement.innerHTML = `
          <p class="author">${comment.author.first_name}</p>
          <p class="message">${comment.message}</p>
        `;
      commentsContainer.appendChild(commentElement);
    });
    document.getElementById("comments").innerText = data.comments.length;
    console.log("FETCHED DATA AT LINE 29", data);
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
    console.log("THIS IS THE TOKEN", token);
    // if (!token) {
    //   alert("Please log in to add a comment.");
    //   return false;
    // }
    // let message = document.querySelector(".child").value;
    // if (!message) return alert("Please fill out your message!");
    // else {
    const data = {
      message: messageInput.value,
    };
    console.log("THIS IS THE MESSAGE INPUT VALUE", data);
    fetch(`https://ntirushwabrand-bn-2.onrender.com/blog/${blogId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("IS THIS INPUT DATA OR FETCHED ONES ?", data);
        // window.location.reload();
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
  fetch(`https://ntirushwabrand-bn-2.onrender.com/blogs/${blogId}/like`, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
