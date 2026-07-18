import { NavLink, Link } from "react-router-dom";
import logo from "../assets/icons/logo.png"; // adjust name if needed
import githubIcon from "../assets/icons/github-icon.png"; 

function Navbar() {

    // Center Anchor Links with active styling, mobile dropdown 
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent font-semibold"
              : "text-black"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/apps"
          className={({ isActive }) =>
            isActive
              ? "bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent font-semibold"
              : "text-black"
          }
        >
          Bikes
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/installation"
          className={({ isActive }) =>
            isActive
              ? "bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent font-semibold"
              : "text-black"
          }
        >
          Orders
        </NavLink>
      </li>
    </>
  );
// Center Anchor Links with active styling, mobile dropdown end 
  return (
    <div className="navbar bg-base-100 shadow-sm px-4 lg:px-10">
      
      {/* LEFT: Logo */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-8" />
          <span className="text-xl font-bold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
            BIKER.IO
          </span>
        </Link>
      </div>

      {/* MOBILE MENU */}
      <div className="navbar-center lg:hidden">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            ☰
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
      </div>

      {/* CENTER MENU (DESKTOP) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          {navLinks}
        </ul>
      </div>

      {/* RIGHT BUTTON */}
      <div className="navbar-end">
        <a
          href="https://github.com/FARANTO"
          target="_blank"
          rel="noreferrer"
          className="btn text-white border-none"
          style={{
            background: "linear-gradient(to right, #632EE3, #9F62F2)",
          }}
        >
          <img src={githubIcon} alt="GitHub" className="w-5 h-5" />
          Contribute
        </a>
      </div>
    </div>
  );
}

export default Navbar;