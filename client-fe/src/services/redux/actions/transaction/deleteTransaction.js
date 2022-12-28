import CheckinAPI from "../../../../api/CheckinAPI";

export const deleteListTransaction = (listTransaction) => async (dispatch) => {
  dispatch({ type: "TRANSACTION/DELETE_LIST_TRANSACTION" });
  console.log("listransaction", listTransaction);
  const response = CheckinAPI.deleteCheckinInfo(listTransaction);

  response
    .then((res) => {
      dispatch({
        type: "TRANSACTION/DELETE_LIST_TRANSACTION_SUCCESS",
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "TRANSACTION/DELETE_LIST_TRANSACTION_FAIL",
        message: err.message,
      });
    });
};
