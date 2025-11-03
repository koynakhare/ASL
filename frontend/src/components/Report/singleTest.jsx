import React from "react";
import { Typography } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import GlobalTable from "../common/table";
import CustomDialog from "../common/customModal";

const SingleTest = ({ open, onClose, selectedTest }) => {
  const modalColumns = [
    { key: "name", label: "Name", sortable: true },
    { key: "meaning", label: "Meaning", sortable: false },
    { key: "score", label: "Score", sortable: true },
    { key: "status", label: "Status", type: "status", sortable: false },
  ];

  const modalData =
    selectedTest?.attempts?.map((a) => ({
      image_path: a.sign.image_path,
      name: a.sign.name,
      meaning: a.sign.meaning,
      score: `${a.score}%`,
      status: a.is_correct ? "correct" : "incorrect",
    })) || [];

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title={
        <>
          <Visibility color="primary" /> Test Details
        </>
      }
    >
      {selectedTest ? (
        <>
          <Typography variant="subtitle1" mb={2}>
            <strong>Test ID:</strong> {selectedTest.test_id}
          </Typography>
          <GlobalTable columns={modalColumns} data={modalData} rowsPerPage={5} />
        </>
      ) : (
        <Typography>No test selected.</Typography>
      )}
    </CustomDialog>
  );
};

export default SingleTest;
