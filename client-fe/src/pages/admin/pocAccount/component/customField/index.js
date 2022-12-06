import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import * as React from "react";
import AlertPocAccount from "../alert";
export default function CustomField({ width, row, field }) {
  const [openDialog, setOpenDialog] = React.useState(false);
  let handlerActivate = (open) => {
    setOpenDialog(open);
  };
  let message = React.useRef();
  let fieldHandler = () => {
    console.log(typeof field);
    console.log(field);
    switch (field) {
      case "active": {
        if (row[field] !== 0) {
          message.current = "Tài khoản đã được xác minh";
        }
        message.current =
          "Tài khoản chưa được xác minh, bạn có muốn xác minh tài khoản này";
        setOpenDialog(true);
        break;
      }
      default: {
        console.log("Default case");
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
        handler={handlerActivate}
        message={message.current}
      />
    </>
  );
}
