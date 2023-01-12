import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import * as React from "react";
import { updatePocAccount } from "../../../../../../services/redux/actions/accounts/updateAccount";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { resetApiState as resetTransactionApiState } from "../../../../../../services/redux/actions/transaction/transaction";
import { resetState } from "../../../../../../services/redux/actions/poc/poc";
import { deleteListTransaction } from "../../../../../../services/redux/actions/transaction/deleteTransaction";

export function AlertDeleteTransaction({
  open,
  message,
  deleteList,
  setDeleteList = (f) => f,
  selectedListTransaction,
  setSelectedListTransaction = (f) => f,
  setOpen = (f) => f,
}) {
  /**
   * State để hiển thị câu hỏi xác nhận (true: hiển thị câu hỏi, false: ngược lại)
   * Khi click chọn xóa, popup sẽ mở lên và hiển thị câu hỏi xác nhận đầu tiên => confirmQuestion = true
   * Sau khi xác nhận => confirmQuestion = false
   * => Dùng state confirmQuestion để điều chỉnh hiển thị câu hỏi hay trạng thái kết quả
   */
  const [confirmQuestion, setConfirmQuestion] = React.useState(true);

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.transactionState.loading);
  const success = useSelector((state) => state.transactionState.success);
  const failure = useSelector((state) => state.transactionState.failure);
  const transaction = useSelector(
    (state) => state.transactionState.transaction
  );

  const handleCloseAlertResult = () => {
    if (success) {
      setDeleteList(false);
      setSelectedListTransaction([]);
    } else if (failure) {
      setDeleteList(false);
    }
    dispatch(resetTransactionApiState());
    setConfirmQuestion(true);
    setOpen(false);
  };

  const handleConfirmDeleteTransaction = () => {
    if (deleteList) {
      dispatch(deleteListTransaction(selectedListTransaction));
      console.log("Delete list transaction: ", selectedListTransaction);
    } else {
      dispatch(deleteListTransaction([transaction]));
      console.log("Delete transaction: ", transaction);
    }

    setConfirmQuestion(false);
  };
  return (
    <>
      {/* Khi popup mở lên sẽ hỏi xác nhận xóa trước tiên, 
          khi xác nhận sẽ đặt confirmQuestion => false, 
          nếu đóng sẽ setOpen(false) */}
      <Dialog
        open={open && confirmQuestion}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDeleteTransaction} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Hiển thị khi đang loading api, 
      !confirmQuestion => Kiểm tra nếu đã trả lời câu hỏi xác nhận thì mới hiển thị */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open && !confirmQuestion && loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Hiển thị khi xóa transaction không thành công, 
      !confirmQuestion => Kiểm tra nếu đã trả lời câu hỏi xác nhận thì mới hiển thị
      khi xác nhận trạng thái kết quả, close hay OK đều dẫn đến phải resetApiState  */}
      <Dialog
        open={open && !confirmQuestion && failure}
        onClose={handleCloseAlertResult}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Xóa thông tin check-in không thành công{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlertResult} autoFocus>
            OK{" "}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Hiển thị khi xóa không thành công, 
      !confirmQuestion => Kiểm tra nếu đã trả lời câu hỏi xác nhận thì mới hiển thị,
      khi xác nhận trạng thái kết quả, close hay OK đều dẫn đến phải resetApiState */}
      <Dialog
        open={open && !confirmQuestion && success}
        onClose={handleCloseAlertResult}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn đã xóa thành công thông tin check-in này
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlertResult} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
