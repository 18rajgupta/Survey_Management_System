import {
  BsBoxArrowInRight,
  BsBoxArrowInLeft,
  BsFillPersonFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import Image from "react-bootstrap/Image";
import Logo from "../../assets/logo.png";
import "./Header.css";

export default function Header() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <div>
      <header className="header">
        <div className="logo">
          <Image src={Logo} 
            style={{
              height: "48px",
              width: "48px",
              marginRight: "10px",
            }}/>
          <Link
            to="/dashboard"
            style={{
              textDecoration: "none",
              fontSize: "1.7rem",
              fontWeight: 600,
              color: "#fff",
            }}
          >
            {user && user.role === "admin" ? "SurveySage Admin" : "SurveySage User"}
            
          </Link>
        </div>
        <ul>
          {user && (
            <>
              <li>
                <button
                  className="btn"
                  onClick={handleClick}
                  style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 400 }}
                >
                  <BsBoxArrowInLeft /> Logout
                </button>
              </li>
            </>
          )}

          {!user && (
            <>
              <li>
                <Link to="/login">
                  <BsBoxArrowInRight /> Login
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <BsFillPersonFill /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </div>
  );
}
