const { useState, useEffect } = React;

function ViewBlog() {
  const [blog, setBlog] = useState(null);

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

  if (!blog) {
    return <p>Loading Blog</p>;
  }

  return (
    <>
      <div className="blog-heading">
        <h3 id="title">{blog.title}</h3>
        <p id="date">{new Date(blog.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="container">
        <img src={blog.image} alt={blog.title} />
        <p id="over-text">{blog.content}</p>
      </div>
      <div className="display-input" id="commentContent">
        <div className="comments-list"></div>
      </div>
    </>
  );
}

ReactDOM.render(
  React.createElement(ViewBlog, null),
  document.getElementById("view-content")
);
