import pocApi from "../../../../api/PocApi";

export const fetchListPocByEventCode = (eventCode) => async (dispatch) => {
  dispatch({ type: "POC/FETCH_LIST_POC" });
  const params = { eventCode: eventCode };
  const response = pocApi.getAllByEventCode(params);

  response
    .then((res) => {
      dispatch({ type: "POC/FETCH_LIST_POC_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "POC/FETCH_LIST_POC_FAIL", message: err.message });
    });
};

export const fetchPocInfo = (eventCode) => async (dispatch) => {
  dispatch({ type: "POC/FETCH_POC_INFO" });

  const params = { eventCode: eventCode };
  const response = pocApi.fetchPocInfo(params);

  response
    .then((response) => {
      dispatch({
        type: "POC/FETCH_POC_INFO_SUCCESS",
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({ type: "POC/FETCH_POC_INFO_ERROR", message: error.message });
    });
};
