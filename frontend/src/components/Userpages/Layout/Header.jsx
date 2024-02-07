import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { TbButterfly } from "react-icons/tb";

const Header = () => {
  const users = useSelector((state) => state.user);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("usertoken");
    navigate("/login");
    // dispatch an action if necessary
  };

  const handleLogoClick = () => {
    console.log("Logo clicked! Showing alert...");
    // Show alert message in the console when the logo is clicked
    // You can add additional actions here if needed
  };

  return (
    <div className="navbar bg-sky-300 flex justify-between  fixed top-0 w-full z-50">
      <div>
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-sky-500 rounded-none w-52 text-white"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li tabIndex={0}>
              <Link to="/resortList">Resort</Link>
            </li>
            <li>
              <Link to="/adventure">Adventure</Link>
            </li>
            <li>
              <Link to="/destinations">Destinations</Link>
            </li>
          </ul>
        </div>

        <Link
          to="/"
          className="btn btn-ghost normal-case text-3xl text-white"
        >
          <TbButterfly onClick={() => alert("hello world")} />
          Innshot
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white text-xl">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/resortList">Resort</Link>
          </li>
          <li>
            <Link to="/adventure">Adventure</Link>
          </li>
          <li>
            <Link to="/destinations">Destinations</Link>
          </li>
        </ul>
      </div>
      {users.name ? (
        <div className="float-left gap-2 ">
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="flex justify-center items-center">
                <FaUser className="text-white text-xl" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-sky-500 rounded-box w-52 text-white"
            >
              <li>
                <Link to="/profile">
                  <a className="justify-between">{users.name}</a>
                </Link>
              </li>
              <li>
                <Link to="/myBooking">
                  <a>My Booking</a>
                </Link>
              </li>
              <li>
                <a onClick={() => handleLogout()}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Link to="/login" className="btn btn-ghost">
          Login
        </Link>
      )}
    </div>
  );
};

export default Header;
