import accountApi from "../../../../api/AccountApi";

export const getNumberOfPocAccount = () => async (dispatch) => {
  dispatch({ type: "ACCOUNT/STATISTIC_NUMBER_OF_ACCOUNT" });

  const response = accountApi.getNumberOfPocAccount();

  response
    .then((res) => {
      dispatch({
        type: "ACCOUNT/STATISTIC_NUMBER_OF_ACCOUNT_SUCCESS",
        payload: res.data,
      });
      console.log("ACCOUNT/STATISTIC_NUMBER_OF_ACCOUNT_SUCCESS", res.data);
    })
    .catch((err) => {
      dispatch({
        type: "ACCOUNT/STATISTIC_NUMBER_OF_ACCOUNT_FAIL",
        message: err.message,
      });
      console.log("ACCOUNT/STATISTIC_NUMBER_OF_ACCOUNT_FAIL", err.message);
    });
};
