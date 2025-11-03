import React from "react";

const Tabs = ({ tabs = [], activeTab, onChange, className = "" }) => {
  return (
    <div className={`flex border-b border-gray-300 dark:border-gray-700 ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.value === activeTab;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`flex-1 pb-2 text-center transition-all ${
              isActive
                ? "border-b-2 border-primary text-primary font-semibold"
                : "text-gray-500 dark:text-gray-400 hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
