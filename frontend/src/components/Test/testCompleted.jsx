import React from "react";
import PageTitle from "../common/pageTitle";
import Results from "../Result";

const TestCompleted = ({ score, total, onRetake, results }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 dark:text-white">
      <PageTitle
        title="Test Completed 🎉"
        description={`You answered ${results?.data?.filter((r) => r?.correct)?.length} / ${total} signs correctly!`}
      />
      <Results
      results={results}
      />
      {/* <button
        onClick={onRetake}
        className="bg-primary text-white px-6 py-2 rounded-full hover:scale-105 duration-200"
      >
        Retake Test
      </button> */}
    </div>
  );
};

export default TestCompleted;
