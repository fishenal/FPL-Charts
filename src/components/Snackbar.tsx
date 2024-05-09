import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { EventBus } from "@/utils/eventBus";

export const GlobalSnackbar = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    EventBus.$on("onMessage", (msg: string) => {
      setOpenSnackbar(false);
      setMessage(msg);
      setOpenSnackbar(true);
    });
  });

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
    />
  );
};
