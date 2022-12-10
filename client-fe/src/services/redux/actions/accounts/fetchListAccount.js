import accountApi from "../../../../api/AccountApi";

export const fetchListPocAccount = (tenantCode) => async (dispatch) => {
  dispatch({ type: "ACCOUNT/FETCH_LIST_POC_ACCOUNT" });
  const params = { tenantCode: tenantCode };
  const response = accountApi.fetchListPocAccount(params);

  response
    .then((res) => {
      dispatch({
        type: "ACCOUNT/FETCH_LIST_POC_ACCOUNT_SUCCESS",
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "ACCOUNT/FETCH_LIST_POC_ACCOUNT_FAIL",
        message: err.message,
      });
    });
};

export const fetchPocAccountInfo = (username) => async (dispatch) => {
  dispatch({ type: "ACCOUNT/FETCH_POC_ACCOUNT_INFO" });

  const params = { username: username };
  const response = accountApi.fetchPocAccountInfoByUsername(params);

  response.then((response) => {});
};
