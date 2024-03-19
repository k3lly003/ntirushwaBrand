const { useState, useEffect } = React;

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://ntirushwabrand-bn-2.onrender.com/api/blogs"
        );
        console.log("THIS IS THE RESPONSE FROM SERVER", response);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  if (!blogs.length) {
    return <p>Loading blogs...</p>;
  }
  console.log(blogs);
  return (
    <>
      <div className="blogs">
        {blogs.map((item, idx) => (
          <div className="child" key={idx}>
            <div className="blog-img">
              <img src={item.image} alt={item.title} />
            </div>
            <a href={`./single-blog-view.html?id=${item._id}`}>
              <div>
                <div className="up">
                  <p>{item.title}</p>
                </div>
                <div className="low">
                  <p>{item.description}</p>
                </div>
              </div>
            </a>
            <div className="feed">
              <div className="like">
                <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                <p>{item.likes}</p>
              </div>
              <div className="come">
                <i className="fa fa-comment-o" aria-hidden="true"></i>
                <p>{item.comments}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
ReactDOM.render(
  React.createElement(Blogs, null),
  document.querySelector(".blogs")
);
