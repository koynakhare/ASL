import React, { useState } from "react";
import Logo from "../../assets/website/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  HistoryPageUrl,
  HomePageUrl,
  LearnPageUrl,
  ReportPageUrl,
  TestPageUrl,
} from "../../constant";
import { logoutUser } from "../../utils/helper";

const Menu = [
  { id: 1, name: "Home", link: HomePageUrl },
  { id: 2, name: "Learn", link: LearnPageUrl },
  { id: 3, name: "Test", link: TestPageUrl },
  { id: 4, name: "Report", link: ReportPageUrl },
];

const Navbar = ({ handleAuthPopup }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrderClick = () => {
    if (login?.token) {
      logoutUser(dispatch);
    } else {
      handleAuthPopup();
    }
  };

  const isLoggedIn = !!login?.token;

  return (
    <nav className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-4 sm:px-6">
        {/* Left - Logo */}
        <div
          onClick={() => navigate(HomePageUrl)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={Logo} alt="Logo" className="w-10" />
          <span className="font-bold text-2xl sm:text-3xl">ASL</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex items-center gap-6">
          {Menu.map((menu) => (
            <li key={menu.id}>
              <a
                href={menu.link}
                className="inline-block py-2 px-3 hover:text-primary transition-colors duration-200"
              >
                {menu.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Login/Logout Button (Desktop) */}
        <div className="hidden sm:block">
          <button
            onClick={handleOrderClick}
            className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-5 rounded-full"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`sm:hidden fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-900 z-40 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
          <div
            onClick={() => {
              navigate(HomePageUrl);
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src={Logo} alt="Logo" className="w-10" />
            <span className="font-bold text-2xl">ASL</span>
          </div>
          <FaTimes
            className="text-2xl cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        <ul className="flex flex-col items-center gap-6 py-8 text-lg">
          {Menu.map((menu) => (
            <li key={menu.id}>
              <a
                href={menu.link}
                onClick={() => setMenuOpen(false)}
                className="block hover:text-primary transition-colors duration-200"
              >
                {menu.name}
              </a>
            </li>
          ))}

          <button
            onClick={() => {
              handleOrderClick();
              setMenuOpen(false);
            }}
            className="mt-6 bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-6 rounded-full"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
