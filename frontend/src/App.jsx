import React, { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { AppRoutes } from "./routes/index";
import AuthPopup from "./components/Auth/index.jsx";
import Services from "./components/Services/Services.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getItemFromLocalStorage } from "./utils/helper.jsx";
import { insertToken } from "./utils/auth.jsx";
import "./app.css";
import { isEmpty } from "lodash";
import Alerts from "./components/common/alert.jsx";

const App = () => {
  const loginState = useSelector((state) => state.login);
  const [authPopup, setAuthPopup] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleAuthPopup = useCallback(() => {
    if (isEmpty(loginState?.token)) {
      setAuthPopup(true); // ✅ open only, don't toggle
    }
  }, [loginState?.token]);

  useEffect(() => {
    dispatch(insertToken());
  }, [dispatch]);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Alerts/>
      <Navbar handleAuthPopup={handleAuthPopup} />
      <AppRoutes handleAuthPopup={handleAuthPopup} />
      {location.pathname === "/" && (
        <>
          <Services handleAuthPopup={handleAuthPopup} />
          {/* <Footer /> */}
        </>
      )}
      <AuthPopup authPopup={authPopup} setAuthPopup={setAuthPopup} />
    </div>
  );
};

const Root = () => (
  <Router>
    <App />
  </Router>
);

export default Root;
