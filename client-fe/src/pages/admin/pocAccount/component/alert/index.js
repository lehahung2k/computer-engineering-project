import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import * as React from "react";

export default function AlertPocAccount({ open, message, handler = (f) => f }) {
  return (
    <Dialog
      open={open}
      onClose={() => handler(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handler(false)} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
