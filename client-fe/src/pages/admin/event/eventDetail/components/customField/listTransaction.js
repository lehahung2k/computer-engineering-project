import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePocAccount } from "../../../../../../services/redux/actions/accounts/updateAccount";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { resetApiState } from "../../../../../../services/redux/actions/accounts/account";
import {
  RemovePocAction,
  UpdatePocAction,
} from "../../../../../../services/redux/actions/poc/poc";
// import { checkDeleteCondition } from "../../../../../../services/redux/actions/poc/deletePoc";
// import { AlertDeletePoc } from "../popup/alert";
import { fetchListTransaction } from "../../../../../../services/redux/actions/transaction/fetchListTransaction";

export function CustomFieldListTransaction({
  width,
  row,
  field,
  clickHandler = (f) => f,
  key,
}) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const usernameSelected = React.useRef("");
  const selected = React.useRef(false);
  const dispatch = useDispatch();

  let message = React.useRef();
  let fieldHandler = () => {
    console.log(typeof field);
    console.log(field);
    switch (field) {
      //   case "delete": {
      //     // Xóa poc trong danh sách state listPoc trong redux store
      //     console.log(row);
      //     const clonePoc = structuredClone(row);
      //     clonePoc.enable = false;
      //     console.log("Updated poc", clonePoc);
      //     // dispatch(UpdatePocAction(clonePoc));

      //     // Kiểm tra điều kiện xóa và gửi api xóa lên server
      //     message.current = "Bạn có muốn xóa thông tin quầy hàng này không ?";
      //     dispatch(checkDeleteCondition([clonePoc.pointCode]));
      //     setOpenDialog(true);

      //     break;
      //   }

      case "transaction": {
        console.log("transaction");
        dispatch(fetchListTransaction(row.pointCode));
        clickHandler(2);
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
      {/* <TableCell align="center" width={width} key={key}>
        <Button
          style={{ textTransform: "none" }}
          variant="outlined"
          color={"error"}
          onClick={() => fieldHandler()}
          sx={{ whiteSpace: "normal", fontSize: "10px" }}
        >
          {"Xóa"}
        </Button>
      </TableCell> */}
      {customTableCell(width, key, field, fieldHandler)}

      {/* <AlertDeletePoc
        open={openDialog}
        // selected={selected.current}
        setOpen={setOpenDialog}
        message={message.current}
        usernameSelected={usernameSelected.current}
      /> */}
    </>
  );
}

const customTableCell = (width, key, type, clickHandler = (f) => f) => {
  switch (type) {
    case "delete": {
      return (
        <>
          <TableCell align="center" width={width} key={key}>
            <Button
              style={{ textTransform: "none" }}
              variant="outlined"
              color={"error"}
              onClick={() => clickHandler()}
              sx={{ whiteSpace: "normal", fontSize: "10px" }}
            >
              {"Xóa"}
            </Button>
          </TableCell>
        </>
      );
    }

    case "transaction": {
      return (
        <>
          <TableCell align="center" width={width} key={key}>
            <Button
              style={{ textTransform: "none" }}
              variant="outlined"
              color={"primary"}
              onClick={() => clickHandler()}
              sx={{ whiteSpace: "normal", fontSize: "10px" }}
            >
              {"Xem"}
            </Button>
          </TableCell>
        </>
      );
    }

    default: {
      return <></>;
    }
  }
};
