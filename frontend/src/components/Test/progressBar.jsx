import React from "react";

const ProgressBar = ({ current, total, progress }) => (
  <div className="w-full max-w-2xl mx-auto mb-3">
    <div className="flex justify-between text-sm mb-1">
      <span>Sign {current + 1} of {total}</span>
      <span>{progress.toFixed(0)}%</span>
    </div>
    <div className="w-full bg-gray-300 rounded-full h-2">
      <div
        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

export default ProgressBar;
