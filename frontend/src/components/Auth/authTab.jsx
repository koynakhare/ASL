import React from "react";
import Tabs from "../common/tab";

const AuthTabs = ({ isLogin, handleTabChange }) => {
  const tabs = [
    { label: "Login", value: "login" },
    { label: "Register", value: "register" },
  ];

  return (
    <>
      <h2 className="text-2xl font-semibold text-center mb-4">
        {isLogin ? "Login" : "Register"}
      </h2>

      <Tabs
        tabs={tabs}
        activeTab={isLogin ? "login" : "register"}
        onChange={(value) => handleTabChange(value === "login")}
        className="mb-6"
      />
    </>
  );
};

export default AuthTabs;
