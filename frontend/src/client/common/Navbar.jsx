import { Link, NavLink, useNavigate } from "react-router-dom";

import UserContext from "store/context/UserContext";
import { useContext } from "react";
import "./style.css";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <div>
      <header className="nav-container">
        <nav>
          <ul className="nav_links" id="hamburger">
            {user?.role === "user" ? (
              <li className="nav-links-href">
                <button className="btn btn-primary">{user?.name}</button>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-links-href">
                <Link className="nav-links-href btn btn-primary " to="/login">
                  Login
                </Link>
                <Link
                  className="nav-links-href btn btn-primary "
                  to="/register"
                >
                  Register
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
