import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function MySnackbar({ openSnack, message }) {
  return (
    <div>
      <Snackbar open={openSnack} autoHideDuration={3000}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
