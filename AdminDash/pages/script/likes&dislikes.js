const { useState, useEffect } = React;

function Like({ blogId }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [blog, setBlog] = useState(null);
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(
          `https://ntirushwabrand-bn-2.onrender.com/api/blogs/${blogId}/like`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch likes: ${response.status}`);
        }
        const data = await response.json();
        setLikes(data.likes);
        console.log(data.likes);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    fetchLikes();
  }, [blogId]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const blogId = searchParams.get("id");

    const fetchBlogContent = async () => {
      try {
        const response = await fetch(
          `https://ntirushwabrand-bn-2.onrender.com/api/blogs/${blogId}`
        );
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlogContent();
  }, []);

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please Log In To Like This Blog Post.");
      console.log("Please Log In To Like This Blog Post.");
      return;
    }
    try {
      const method = "PATCH";
      const response = await fetch(
        `https://ntirushwabrand-bn-2.onrender.com/api/blogs/${blogId}/like`,
        {
          method,
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error(
          `Failed to ${liked ? "unlike" : "like"} post: ${response.status}`
        );
      }
      setLiked(!liked);
      setLikes(liked ? likes - 1 : likes + 1);
    } catch (error) {
      console.error(`Error ${liked ? "unliking" : "liking"} post:`, error);
    }
  };
  console.log("blogssss", blog);
  return (
    <>
      <div class="display">
        <i
          className={`fa ${liked ? "fa-thumbs-up" : "fa-thumbs-o-up"}`}
          aria-hidden="true"
          id="addLikeOnBlog"
          onClick={handleLike}
        ></i>
        <p id="displayLikes">{likes}</p>
      </div>
      <i
        class="fa fa-comment"
        aria-hidden="true"
        id="./single-blog-view.html#addCom"
      ></i>
      <p id="comments">{blog ? blog.comments.length : "not loaded"}</p>
    </>
  );
}

ReactDOM.render(<Like blogId={1} />, document.querySelector("#display"));
