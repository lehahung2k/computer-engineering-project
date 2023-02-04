import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import NormalTable from "../../../../../../components/tables/normal";
import { useSelector, useDispatch } from "react-redux";
import { fetchListPocByEventCode } from "../../../../../../services/redux/actions/poc/fetchListPoc";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CheckTable from "../../../../../../components/tables/check";
import { CustomFieldListTransaction } from "../customField/listTransaction";
import Box from "@mui/material/Box";
import { AlertDeleteTransaction } from "../popup/alertListTransaction";
import { ShowTransactionImage } from "../popup/showTransactionImage";
import { deleteListTransaction } from "../../../../../../services/redux/actions/transaction/deleteTransaction";
import moment from "moment";

const headCells = [
  { id: "id", label: "", sort: false },
  {
    id: "name",
    label: "Họ và tên",

    sort: true,
  },
  {
    id: "guestCode",
    label: "Mã định danh",
    sort: false,
  },
  {
    id: "createTime",
    label: "Thời điểm check-in",
    sort: true,
  },
  {
    id: "note",
    label: "Ghi chú",
    sort: false,
  },
  {
    id: "image",
    label: "Hình ảnh check-in",
    sort: false,
  },
  { id: "delete", label: "Xóa", sort: false },
];
export default function ListTransaction({ setActiveStep = (f) => f }) {
  const handleClickBack = () => {
    setActiveStep(1);
  };
  const [openDialog, setOpenDialog] = React.useState(false);
  const [message, setMessage] = React.useState("");
  console.log("OpenDialog state", openDialog);
  const [selectedTransaction, setSelectedTransaction] = React.useState([]);
  const [deleteListTransaction, setDeleteListTransaction] =
    React.useState(false);
  const listPoc = useSelector((state) => state.pocState.listPoc);
  const eventCode = useSelector((state) => state.eventState.event.eventCode);
  const loading = useSelector((state) => state.pocState.loading);
  const filteredListPoc = listPoc.filter((poc) => poc.enable === true);

  const [transactionForShowImage, setTransactionForShowImage] = React.useState(
    {}
  );
  const [showTransactionImage, setShowTransactionImage] = React.useState(false);

  const dispatch = useDispatch();
  const listTransaction = useSelector(
    (state) => state.transactionState.listTransaction
  );
  const filteredListTransaction = listTransaction
    .filter((transaction) => transaction.enable === 1)
    .map((transaction) => ({
      ...transaction,
      createTime: moment(transaction.createTime).format("YYYY-MM-DD HH:mm:ss"),
    }));
  const handleClickDeleteListTransaction = () => {
    console.log("delete list transaction", selectedTransaction);
    setMessage("Bạn có muốn xóa các giao dịch check-in này không ?");
    setDeleteListTransaction(true);
    setOpenDialog(true);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6} align="left">
          <Button
            variant="contained"
            startIcon={<KeyboardArrowLeftIcon />}
            sx={{ textTransform: "none" }}
            onClick={() => handleClickBack()}
          >
            Quay lại
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            {selectedTransaction.length > 0 ? (
              <Button
                variant="outlined"
                sx={{ textTransform: "none", m: 1 }}
                onClick={handleClickDeleteListTransaction}
                color="error"
              >
                Xóa mục đã chọn
              </Button>
            ) : (
              <></>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} align="left">
          <Typography variant="h6">Danh sách POC</Typography>
        </Grid>

        <Grid item xs={12}>
          {/* <NormalTable rows={filteredListTransaction} headCells={headCells} /> */}
          <CheckTable
            key={filteredListTransaction}
            id={"tranId"}
            rows={filteredListTransaction}
            headCells={headCells}
            setSelectedItem={setSelectedTransaction}
            customField={[
              {
                id: "delete",
                component(row, index) {
                  return (
                    <CustomFieldListTransaction
                      width="10%"
                      field="delete"
                      row={row}
                      key={index}
                      setMessage={setMessage}
                      setOpenDialog={setOpenDialog}
                    />
                  );
                },
              },
              {
                id: "transaction",
                component(row, index) {
                  return (
                    <CustomFieldListTransaction
                      width="10%"
                      field="transaction"
                      row={row}
                      key={index}
                      clickHandler={setActiveStep}
                    />
                  );
                },
              },
              {
                id: "image",
                component(row, index) {
                  return (
                    <CustomFieldListTransaction
                      width="10%"
                      field="image"
                      row={row}
                      key={index}
                      setMessage={setTransactionForShowImage}
                      setOpenDialog={setShowTransactionImage}
                    />
                  );
                },
              },
            ]}
          />
        </Grid>
      </Grid>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Pop up hiển thị xác nhận xóa và thông báo trạng thái kết quả */}
      <AlertDeleteTransaction
        open={openDialog}
        key={openDialog}
        setOpen={setOpenDialog}
        message={message}
        deleteList={deleteListTransaction}
        setDeleteList={setDeleteListTransaction}
        setSelectedListTransaction={setSelectedTransaction}
        selectedListTransaction={selectedTransaction}
      />

      <ShowTransactionImage
        open={showTransactionImage}
        setOpen={setShowTransactionImage}
        image1={transactionForShowImage.checkinImg1}
        image2={transactionForShowImage.checkinImg2}
      />
    </div>
  );
}
