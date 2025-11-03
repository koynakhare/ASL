import React from "react";
import { IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import GlobalTable from "../common/table";

const ReportTable = ({ report, onView }) => {
  const mainColumns = [
    { key: "index", label: "#", sortable: false },
    { key: "created_at", label: "Date", type: "date-time", sortable: true },
    { key: "attempts", label: "Attempts", sortable: false },
    { key: "correct", label: "Correct", sortable: true },
    { key: "avgScore", label: "Avg Score", sortable: true },
    { key: "action", label: "Action", sortable: false },
  ];

  const mainData = report?.history?.map((test, index) => {
    const correctCount = test.attempts.filter((a) => a.is_correct).length;
    const avgScore =
      test.attempts.reduce((sum, a) => sum + a.score, 0) / test.attempts.length;
    return {
      index: index + 1,
      test_id: test.test_id.slice(0, 8) + "...",
      created_at: test.created_at,
      attempts: test.attempts.length,
      correct: correctCount,
      avgScore: `${avgScore.toFixed(1)}%`,
      action: (
        <IconButton size="small" onClick={() => onView(test)}>
          <Visibility fontSize="10px" />
        </IconButton>
      ),
    };
  });

  return <GlobalTable columns={mainColumns} data={mainData} rowsPerPage={5} />;
};

export default ReportTable;
