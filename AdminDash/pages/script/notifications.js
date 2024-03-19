const { useState, useEffect } = React;

function Notification() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://ntirushwabrand-bn-2.onrender.com/api/messages"
        );
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
    return React.createElement("p", null, "Loading blogs...");
  }

  return React.createElement(
    "div",
    { className: "blogs" },
    blogs.map((blog, index) =>
      React.createElement(Message, { key: index, message: blog })
    )
  );
}

function Message({ message }) {
  console.log(message);
  return (
    <>
      <div class="noti-feed">
        <div class="msg-card">
          <div class="text">
            <div class="acnt-em">
              <i class="fa fa-user" aria-hidden="true"></i>
              <h4>{message.email}</h4>
            </div>
            <p>{message.text}</p>
          </div>
        </div>
      </div>
    </>
  );
}
ReactDOM.render(
  React.createElement(Notification, null),
  document.querySelector(".msgs")
);
