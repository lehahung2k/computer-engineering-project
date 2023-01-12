import CheckinAPI from "../../../../api/CheckinAPI";

export const fetchListTransaction = (pointCode) => async (dispatch) => {
  dispatch({ type: "TRANSACTION/FETCH_LIST_TRANSACTION" });

  const params = { pointCode: pointCode };
  const response = CheckinAPI.getAllTransactionByPointCode(params);

  response
    .then((res) => {
      dispatch({
        type: "TRANSACTION/FETCH_LIST_TRANSACTION_SUCCESS",
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "TRANSACTION/FETCH_LIST_TRANSACTION_FAIL",
        message: err.message,
      });
    });
};
