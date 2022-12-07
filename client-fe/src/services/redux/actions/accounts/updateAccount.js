import accountApi from "../../../../api/AccountApi";

export const updatePocAccount = (username) => async (dispatch) => {
  dispatch({ type: "ACCOUNT/UPDATE_ACCOUNT" });
  const params = { username: username };
  const response = accountApi.updatePocAccount(params);

  response
    .then((res) => {
      dispatch({ type: "ACCOUNT/UPDATE_ACCOUNT_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "ACCOUNT/UPDATE_ACCOUNT_FAIL", message: err.message });
    });
};
