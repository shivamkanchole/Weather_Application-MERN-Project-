import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Store/authslice.js";
import { ImMenu3, ImMenu4 } from "react-icons/im";

const Navbar = () => {
  const Isloggedin = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const [toggle, settoggle] = useState(false);

  const SetLogoutUser = () => {
    dispatch(logout());
  };

  const toggleNavbar = () => {
    settoggle(!toggle);
  };

  return (
    <nav className="bg-blue-500 sm:w-full  sm:flex sm:justify-between sm:h-20 sm:items-center md:p-4 md:flex md:justify-between md:items-center md:w-full">
      <div className="flex justify-between p-3 text-white font-bold text-2xl    sm:flex sm:items-center sm:text-lg  md:text-xl ">
        <div>
          <span className=" text-yellow-400">Weather</span>App
        </div>
        <div onClick={toggleNavbar} className="text-4xl sm:hidden">
          {
            toggle ?<ImMenu4/> : <ImMenu3/>
          }
        </div>
      </div>
      <div
        className={`${
          toggle ? "block" : "hidden"
        } sm:flex sm:text-lg sm:ml-8   md:flex md:gap-8`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive ? "hover:border-b hover:border-blue-500" : ""
            } font-bold text-white block py-2 pr-4 pl-5 duration-200 md:border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-gray-300 lg:p-0`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/weather"
          className={({ isActive }) =>
            `${
              isActive ? "hover:border-b hover:border-blue-500" : ""
            } font-bold text-white block py-2 pr-4 pl-5 duration-200 md:border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-gray-300 lg:p-0`
          }
        >
          Weather
        </NavLink>

        <NavLink
          to={`/city`}
          className={({ isActive }) =>
            `${
              isActive ? "hover:border-b hover:border-blue-500" : ""
            } font-bold text-white block py-2 pr-4 pl-5 duration-200 md:border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-gray-300 lg:p-0`
          }
        >
          Search By City
        </NavLink>
      </div>
      <div>
        {Isloggedin ? (
          <div className="flex justify-between p-2 text-white sm:gap-3 sm:items-center  md:flex md:gap-2">
            <div className="sm:font-serif  md:text-sm md:font-bold md:text-blue-500 md:bg-gray-100 md:p-2 md:rounded-md md:cursor-pointer">
              Welcome, {userData.FullName}
            </div>
            <div
              onClick={SetLogoutUser}
              className="cursor-pointer hover:bg-red-600 text-white bg-red-400 px-2 py-1 rounded-md md:px-4 md:py-2 md:rounded-md"
            >
              Logout
            </div>
          </div>
        ) : (
          <div
            className={`${
              toggle ? "block" : "hidden"
            } flex flex-col ml-5 sm:flex sm:flex-row sm:gap-4 md:flex-row md:gap-4 `}
          >
            <a
              href="/login"
              className="font-bold text-white py-2 hover:text-gray-300"
            >
              Login
            </a>
            <a
              href="/registration"
              className="font-bold text-white py-2 hover:text-gray-300"
            >
              Signup
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export { Navbar };
