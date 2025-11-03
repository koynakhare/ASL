import React from "react";

const ScoreCard = ({ label, value, colorClass }) => (
  <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-[250px] text-center">
    <h2 className="text-lg font-semibold text-gray-500">{label}</h2>
    <p className={`mt-2 font-bold ${colorClass}`}>{value}</p>
  </div>
);

const ScoreSummary = ({ score, total, percentage, timeTaken }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 mb-5">
    
      <ScoreCard
        label="Your Score"
        value={<span className="text-4xl text-green-600 dark:text-green-400">{score}/{total}</span>}
      />
      <ScoreCard
        label="Accuracy"
        value={<span className={`text-4xl ${percentage >= 70 ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>{percentage}%</span>}
      />
      <ScoreCard
        label="Time Taken"
        value={<span className="text-2xl text-blue-500">{timeTaken}</span>}
      />
    </div>
  );
};

export default ScoreSummary;
