import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import * as React from "react";
import { useDispatch } from "react-redux";
import { AlertDeleteTransaction } from "../popup/alertListTransaction";
import { setTransactionInfo } from "../../../../../../services/redux/actions/transaction/transaction";
/**
 * Component giao diện wrapper cho tableCell đã hiệu chỉnh theo trường thông tin trong bảng (theo column name)
 * như trường "Xóa" sẽ custom tablecell thành button Xóa, "Xem" thành button Xem,... kèm theo xử lý logic và các alert khi click
 *
 * @param {Object} param {width: Kích thước tablecell, row: Thông tin hàng của tableCell (Object thông tin được render trong hàng)
 *                        field: Tên column, key, clickHandler: Hàm xử lý khi click chọn (nếu có)}
 * @returns JSX Component
 */
export function CustomFieldListTransaction({
  width,
  row,
  field,
  clickHandler = (f) => f,
  setMessage = (f) => f,
  setOpenDialog = (f) => f,
  key,
}) {
  const selected = React.useRef(false);
  const dispatch = useDispatch();

  /**
   * Xử lý sự kiện khi click chọn vào button
   * Vì trường custom này mục tiêu là tạo sự linh hoạt khi tạo các button với chức năng khác nhau
   * theo từng trường thông tin, nên cần kiểm tra trường được chọn là gì để xác định logic xử lý tương ứng
   */
  let fieldHandler = () => {
    switch (field) {
      case "delete": {
        dispatch(setTransactionInfo(row));
        setMessage("Bạn có muốn xóa thông tin check-in này ?");
        setOpenDialog(true);

        console.log("Open dialog click");
        break;
      }
      case "image": {
        console.log(row);
        setMessage(row);
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
      {customTableCell(width, key, field, fieldHandler)}

      {/* Pop up hiển thị xác nhận xóa và thông báo trạng thái kết quả */}
      {/* <AlertDeleteTransaction
        open={openDialog}
        // selected={selected.current}
        setOpen={setOpenDialog}
        message={message.current}
        usernameSelected={usernameSelected.current}
      /> */}
    </>
  );
}

/**
 * Component hiệu chỉnh lại tablecell để phù hợp từng loại trường thông tin
 *
 * @param {string} width Kích thước tablecell
 * @param {string} key
 * @param {string} type Tên trường thông tin của tablecell (column name)
 * @param {function} clickHandler Hàm xử lý logic khi click chọn button (tablecell)
 * @returns JSX component
 */
const customTableCell = (width, key, type, clickHandler = (f) => f) => {
  switch (type) {
    case "delete": {
      return (
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
      );
    }

    case "image": {
      return (
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
      );
    }

    default: {
      return <></>;
    }
  }
};
