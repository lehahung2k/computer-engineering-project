import accountApi from "../../../../api/AccountApi";
import { fetchTenantInfoByTenantCode } from "../tenant/fetchListTenant";
export const fetchListPocAccount = (type, payload) => async (dispatch) => {
  dispatch({ type: "ACCOUNT/FETCH_LIST_POC_ACCOUNT" });

  let params = {};
  let response = accountApi.fetchListPocAccount();

  switch (type) {
    case "COMMON": {
      break;
    }

    case "CREATE_EVENT": {
      params = {
        tenantCode: payload.tenantCode,
        startTime: payload.startTime,
        endTime: payload.endTime,
      };
      response = accountApi.fetchListPocAccountForCreateEvent(params);
      break;
    }

    default: {
      break;
    }
  }

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
