import React, { useEffect, useState } from "react";
import { Box, Grid, Divider, Typography } from "@mui/material";
import { BarChart, Timeline, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getTestReportAction } from "../../redux/action/testAction";
import { get } from "lodash";
import SummaryCards from "./summaryCard";
import ReportTable from "./reportTable";
import Loading from "../loading";
import SingleTest from "./singleTest";

const Report = () => {
  const reportData = useSelector((state) => state.test);
  const [report, setReport] = useState({});
  const [selectedTest, setSelectedTest] = useState(null);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTestReportAction());
  }, []);

  useEffect(() => {
    setReport({ ...get(reportData, "report", {}) });
  }, [reportData?.report]);

  const handleView = (test) => {
    setSelectedTest(test);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTest(null);
  };

  return (
    <Box
      className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white py-4 px-4"
      sx={{
        bgcolor: "#f9fafb",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f3f4f6 0%, #e0f2f1 100%)",
      }}
    >
      {reportData?.loading && <Loading />}
      <div className="container mx-auto">
        <Box display="flex" alignItems="center" mb={4} gap={1}>
          <BarChart fontSize="large" color="primary" />
          <Typography variant="h5" fontWeight={700}>
            Performance Report
          </Typography>
        </Box>

        <SummaryCards report={report} />

        <Divider sx={{ my: 4 }} />

        <Box mt={3}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Timeline color="action" />
            <Typography variant="h6" fontWeight={600}>
              Test History
            </Typography>
          </Box>

          <ReportTable report={report} onView={handleView} />
        </Box>

        <SingleTest
          open={open}
          onClose={handleClose}
          selectedTest={selectedTest}
        />
      </div>
    </Box>
  );
};

export default Report;
