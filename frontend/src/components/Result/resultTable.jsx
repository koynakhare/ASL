import React from "react";
import { FaChartBar } from "react-icons/fa";
import GlobalTable from "../common/table";

const ResultsTable = ({ columns, data }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
      <FaChartBar className="text-primary" /> Sign-wise Breakdown
    </h2>
    <GlobalTable columns={columns} data={data} rowsPerPage={5} />
  </div>
);

export default ResultsTable;
