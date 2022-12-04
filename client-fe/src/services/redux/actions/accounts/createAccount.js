import authApi from "../../../../api/AuthApi";

export const createAccount = (account) => async (dispatch) => {
  dispatch({ type: "ACCOUNT/CREATE_ACCOUNT" });

  const response = authApi.registerTenantAccount(account);

  response
    .then((res) => {
      dispatch({ type: "ACCOUNT/CREATE_ACCOUNT_SUCCESS", message: res.data });
    })
    .catch((err) => {
      dispatch({ type: "ACCOUNT/CREATE_ACCOUNT_FAIL", message: err.message });
    });
};
