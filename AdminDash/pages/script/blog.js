const { useState, useEffect } = "React";

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  // function to fetch
  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        "https://ntirushwabrand-bn-2.onrender.com/api/blogs"
      ); // Replace with your API URL
      const data = await response.json();
      console.log("THIS IS THE DATA AM LOOKING FOR", data);
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return error;
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

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

  return (
    <>
      <div class="dropdown">
        <i class="fa fa-bars" aria-hidden="true" className="dropbtn"></i>
        <div class="dropdown-content">
          <a href="../dash.html">
            <p>Dashboard</p>
          </a>
          <a href="../notifications.html">
            <p>Notification</p>
          </a>
          <a href="../profile.html">
            <p>Profile</p>
          </a>
          <a href="../blogs.html">
            <p>Blogs</p>
          </a>
          <a href="../themes.html">
            <p>Settings</p>
          </a>
          <a href="">
            <button>logout</button>
          </a>
        </div>
      </div>
      <div class="blog-body-cont">
        <div class="blog-heading">
          <h2>Blogs</h2>
          <a href="./AddBlog.html">
            <div class="add-blog">
              <i class="fa fa-plus" aria-hidden="true"></i>
              <p>Add a blog</p>
            </div>
          </a>
        </div>
        <div class="blog-view" id="blog-container">
          {blogs.length === 0 ? (
            <p>Loading blogs...</p>
          ) : (
            blogs.map((blog) => (
              <div class="blog-one">
                <div class="blog-img">
                  <img src={blog.image} alt="blog-image" />
                </div>
                <div class="blog-paragraphs">
                  <div class="blog-paragraphs">
                    <span>{blog.createdAt}</span>
                    <h3>{blog.title}</h3>
                    <p>{blog.description}</p>
                  </div>
                </div>
                <div class="blog-buto">
                  <button id={blog._id}>Edit</button>
                  <button onClick="deleteContent({blogList[i]._id})">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
ReactDOM.render(<Blogs />, document.querySelector(".body"));
