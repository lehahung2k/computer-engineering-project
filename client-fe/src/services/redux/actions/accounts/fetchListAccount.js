import accountApi from "../../../../api/AccountApi";
import { fetchTenantInfoByTenantCode } from "../tenant/fetchListTenant";
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

export const fetchPocAccountInfo = () => async (dispatch) => {
  dispatch({ type: "ACCOUNT/FETCH_POC_ACCOUNT_INFO" });

  const response = accountApi.fetchPocAccountInfoByUsername();

  response
    .then((response) => {
      const params = { tenantCode: response.data.tenantCode };
      dispatch(fetchTenantInfoByTenantCode(params));
      dispatch({
        type: "ACCOUNT/FETCH_POC_ACCOUNT_INFO_SUCCESS",
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: "ACCOUNT/FETCH_POC_ACCOUNT_INFO_FAIL",
        message: error.message,
      });
    });
};
