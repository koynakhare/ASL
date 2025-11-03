import React from "react";
import { FaRedo, FaChartBar } from "react-icons/fa";

const ResultsActions = () => (
  <div className="flex justify-center mt-12 gap-6">
    <button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full hover:scale-105 duration-200 flex items-center gap-2">
      <FaRedo /> Retake Test
    </button>
    <button className="bg-gray-800 text-white px-8 py-3 rounded-full hover:scale-105 duration-200 flex items-center gap-2">
      <FaChartBar /> View History
    </button>
  </div>
);

export default ResultsActions;
