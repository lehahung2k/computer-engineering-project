import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import * as React from "react";
import AlertPocAccount from "../alert";
import { useDispatch, useSelector } from "react-redux";
import { updatePocAccount } from "../../../../../services/redux/actions/accounts/updateAccount";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { resetApiState } from "../../../../../services/redux/actions/accounts/account";

export default function CustomField({ width, row, field }) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const usernameSelected = React.useRef("");
  const selected = React.useRef(false);
  const dispatch = useDispatch();

  let message = React.useRef();
  let fieldHandler = () => {
    console.log(typeof field);
    console.log(field);
    switch (field) {
      case "active": {
        if (row[field] !== 0) {
          message.current =
            "Tài khoản đã được xác minh, bạn muốn thay đổi trạng thái xác minh của tài khoản này ?";
        } else {
          message.current =
            "Tài khoản chưa được xác minh, bạn có muốn xác minh tài khoản này ?";
        }
        usernameSelected.current = row["username"];
        selected.current = true;
        dispatch(resetApiState());
        setOpenDialog(true);
        break;
      }
      default: {
        console.log("Default case");
        selected.current = false;
      }
    }
  };

  return (
    <>
      <TableCell align="center" width={width}>
        <Button
          style={{ textTransform: "none" }}
          variant="outlined"
          color={row[field] === 0 ? "error" : "primary"}
          onClick={() => fieldHandler()}
          sx={{ whiteSpace: "normal", fontSize: "10px" }}
        >
          {row[field] === 0 ? "Chưa xác minh" : "Đã xác minh"}
        </Button>
      </TableCell>

      <AlertPocAccount
        open={openDialog}
        selected={selected.current}
        setOpen={setOpenDialog}
        message={message.current}
        usernameSelected={usernameSelected.current}
      />
    </>
  );
}
