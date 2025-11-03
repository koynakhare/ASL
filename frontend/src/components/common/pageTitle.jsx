import React from "react";
const PageTitle = ({ title, description }) => {
  return (
    <div className="text-center mb-6">
      <h1 className="text-4xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {title}
      </h1>
      {description && (
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
};

export default PageTitle;
