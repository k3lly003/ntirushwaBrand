import { Link } from "react-router-dom";

function SideBar({ dash, notification, themes, blogs, profile }) {
  return (
    <>
      <div className="side">
        <Link to={dash}>
          <div class="logo-cont">
            <h2>Dashboard</h2>
            <img src="/assets/dashboard.png" alt="" class="logo" />
          </div>
        </Link>
        <Link to={notification}>
          <div class="logo-cont">
            <h2>notification</h2>
            <img src="/assets/notification.png" alt="" class="logo" />
          </div>
        </Link>
        <Link to={profile}>
          <div class="logo-cont">
            <h2>profile</h2>
            <img src="/assets/profile.png" alt="" class="logo" />
          </div>
        </Link>
        <Link to={blogs}>
          <div class="logo-cont">
            <h2>blogs</h2>
            <img src="/assets/blog.png" alt="" class="logo" />
          </div>
        </Link>
        <Link to={themes}>
          <div class="logo-cont">
            <h2>themes</h2>
            <img src="/assets/theme.png" alt="" class="logo" />
          </div>
        </Link>
        <div class="account">
          <img src="" alt="" />
          <button>Logout</button>
        </div>
      </div>
    </>
  );
}
ReactDOM.render(
  <SideBar
    dash="/dash.html"
    notification="/notification.html"
    themes="/themes.html"
    profile="profile.html"
    blogs="/profile.html"
  />,
  document.querySelector(".sidebar")
);
