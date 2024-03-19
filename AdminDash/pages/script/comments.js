const { useState, useEffect } = React;

function BlogComment() {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  let blogId;
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    blogId = searchParams.get("id");

    const fetchComments = async () => {
      const response = await fetch(
        `https://ntirushwabrand-bn-2.onrender.com/api/blogs/${blogId}`
      );
      console.log(response.status);
      const data = await response.json();
      const value = data.comments;
      setComments(value);
    };
    fetchComments();
  }, []);
  console.log(comments);
  const handleInputChange = (e) => {
    setCommentInput(e.target.value);
  };
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const searchParams = new URLSearchParams(window.location.search);
    const blogId = searchParams.get("id");
    console.log("this is blogId", blogId);
    const token = localStorage.getItem("token");
    const commentData = {
      message: commentInput,
    };
    console.log("THIS IS THE DATA INSIDE COMMENTS", commentData);
    try {
      const response = await fetch(
        `https://ntirushwabrand-bn-2.onrender.com/api/blog/${blogId}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(commentData),
        }
      );
      console.log("this token", token);
      if (!response.ok) {
        throw new Error(`Failed to create comment: ${response.status}`);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };
  console.log(comments);
  return (
    <div className="userComment">
      <div className="display-input" id="commentContent">
        <div className="comments-list">
          {comments &&
            comments.map((comment, index) => (
              <div className="comment personal-comment" key={index}>
                <h4>{comment.author.first_name}</h4>
                <p>{comment.message}</p>
              </div>
            ))}
        </div>
      </div>
      <div className="but-in" id="addCom">
        <form onSubmit={handleCommentSubmit}>
          <textarea
            placeholder="Add a comment"
            id="child"
            onChange={handleInputChange}
          >
            {commentInput}
          </textarea>
          <p id="errMsg"></p>
          <button type="submit" id="addComment">
            Comment
          </button>
        </form>
      </div>
    </div>
  );
}

// Example usage
ReactDOM.render(<BlogComment />, document.getElementById("commentContent"));
