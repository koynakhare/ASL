import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Pages
import Home from "../components/Home";
import { getItemFromLocalStorage } from "../utils/helper";
import Learn from "../components/Learn";
import Test from "../components/Test";
import Results from "../components/Result";
import { HomePageUrl, LearnPageUrl,ReportPageUrl,HistoryPageUrl, ResultPageUrl, TestPageUrl } from "../constant";
import Report from "../components/Report";
import History from "../components/History";

const routeList = [
  {
    path: HomePageUrl,
    element: <Home />,

    exact: true,
    protected: false,
  },
  {
    path: HistoryPageUrl,
    element: <History />,

    exact: true,
    protected: false,
  },
  {
    path: LearnPageUrl,
    element: <Learn />,
    protected: true,
  },
  {
    path: ReportPageUrl,
    element: <Report />,
    protected: true,
  },
  {
    path: TestPageUrl,
    element: <Test />,
    protected: true,
  },
  {
    path: ResultPageUrl,
    element: <Results />,
    protected: true,
  },

];

export const AppRoutes = ({ handleAuthPopup }) => {
  const token = getItemFromLocalStorage("token", "");

  return (
    <Routes>
      {routeList.map(({ path, element, protected: isProtected }, index) => {
        if (isProtected && !token) {
          return (
            <Route
              key={index}
              path={path}
              element={
                <AuthRedirect handleAuthPopup={handleAuthPopup} />
              }
            />
          );
        }

        return <Route key={index} path={path} element={element} />;
      })}

      {/* fallback route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

// helper component to trigger popup and redirect
const AuthRedirect = ({ handleAuthPopup }) => {
  React.useEffect(() => {
    handleAuthPopup(); // runs once, after first mount
  }, [handleAuthPopup]);

  return <Navigate to="/" replace />;
};
