import accountApi from "../../../../api/AccountApi";
import { fetchTenantInfoByTenantCode } from "../tenant/fetchListTenant";

export const fetchListPocAccount = (payload) => async (dispatch) => {
  dispatch({ type: "ACCOUNT/FETCH_LIST_POC_ACCOUNT" });

  let params = payload;
  let response = accountApi.fetchListPocAccount(params);

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

export const fetchListPocAccountAvailable = (payload) => async (dispatch) => {
  dispatch({ type: "ACCOUNT/FETCH_LIST_POC_ACCOUNT_AVAILABLE" });

  const params = {
    tenantCode: payload.tenantCode,
    startTime: payload.startTime,
    endTime: payload.endTime,
    time: true,
  };
  const response = accountApi.fetchListPocAccountAvailable(params);

  response
    .then((res) => {
      dispatch({
        type: "ACCOUNT/FETCH_LIST_POC_ACCOUNT_AVAILABLE_SUCCESS",
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "ACCOUNT/FETCH_LIST_POC_ACCOUNT_AVAILABLE_FAIL",
        message: err.message,
      });
    });
};

export const fetchPocAccountInfo = () => async (dispatch) => {
  dispatch({ type: "ACCOUNT/FETCH_POC_ACCOUNT_INFO" });

  const response = accountApi.fetchPocAccountInfoByUsername();

  response
    .then((response) => {
      dispatch(fetchTenantInfoByTenantCode(response.data.tenantCode));
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
