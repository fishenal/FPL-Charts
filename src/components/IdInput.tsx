import React from "react";
import { ChangeEvent, useState } from "react";
import { useAppConfig } from "../hooks/useAppConfig";
import { CustomButton } from "./Button";
import Snackbar from "@mui/material/Snackbar";

export const IdInput = () => {
  const { setId } = useAppConfig();
  const [stId, setStId] = useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStId(e.target.value);
  };

  const handleSearch = () => {
    if (/^\d+$/.test(stId)) {
      setId(stId);
    } else {
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          placeholder="Enter FPL gameId"
          onChange={handleChange}
          value={stId}
          className="px-2 focus:outline-amber-200 rounded-md "
        />
        <CustomButton onClick={handleSearch}>Search</CustomButton>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="ID need to be numbers"
      />
    </>
  );
};
