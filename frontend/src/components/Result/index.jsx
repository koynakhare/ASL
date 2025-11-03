import React, { useEffect } from "react";
import PageTitle from "../common/pageTitle";
import ScoreSummary from "./scoreCard";
import ResultsTable from "./resultTable";
import ResultsActions from "./resultAction";
import { useDispatch, useSelector } from "react-redux";
import { getResultAction } from "../../redux/action/resultAction";

const Results = ({ results }) => {
  let mainData = results?.data;
  mainData = mainData?.map(({ image, ...rest }) => rest);
  const score = results?.score || 0;
  const total = results?.total || 0;
  const percentage = results?.percentage || 0;
  const timeTaken = results?.timeTaken || "—";

  const columns = [
    { key: "name", label: "Sign", type: "text", sortable: true },
    { key: "capturedImage", label: "Captured", type: "image" },
    { key: "score", label: "Score", type: "number" },
    { key: "status", label: "Status", type: "status" },
  ];
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white py-10 px-4">
      <div className="container mx-auto">
        <PageTitle
          title="Your ASL Test Results"
          description="Here’s how you performed 👇"
        />
        <ScoreSummary
          score={score}
          total={total}
          percentage={percentage}
          timeTaken={timeTaken}
        />
        {results?.data?.length > 0 ? (
          <ResultsTable columns={columns} data={results?.data} />
        ) : (
          <p className="text-center mt-6 text-gray-500">
            No results found yet 🫠
          </p>
        )}
        {/* <ResultsActions /> */}
      </div>
    </div>
  );
};

export default Results;
