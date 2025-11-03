import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";

const CustomDialog = ({ open, title, onClose, children, maxWidth = "md" }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      PaperProps={{ sx: { borderRadius: 3, boxShadow: 5 } }}
    >
      <DialogTitle
        sx={{
          bgcolor: "#f4f6f8",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {title}
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>{children}</DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
