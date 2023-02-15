import pocApi from "../../../../api/PocApi";

export const getNumberOfPoc = () => async (dispatch) => {
  dispatch({ type: "POC/STATISTIC_NUMBER_OF_POC" });

  const response = pocApi.getNumberOfPocAll();

  response
    .then((res) => {
      dispatch({
        type: "POC/STATISTIC_NUMBER_OF_POC_SUCCESS",
        payload: res.data,
      });
      console.log("POC/STATISTIC_NUMBER_OF_POC_SUCCESS", res.data);
    })
    .catch((err) => {
      dispatch({
        type: "POC/STATISTIC_NUMBER_OF_POC_FAIL",
        message: err.message,
      });
      console.log("POC/STATISTIC_NUMBER_OF_POC_FAIL", err.message);
    });
};

export const getNumberOfPocEvent = (eventCode) => async (dispatch) => {
  dispatch({ type: "POC/STATISTIC_NUMBER_OF_POC" });

  const params = { eventCode: eventCode };
  const response = pocApi.getNumberOfPocAll(params);

  response
    .then((res) => {
      dispatch({
        type: "POC/STATISTIC_NUMBER_OF_POC_SUCCESS",
        payload: res.data,
      });
      console.log("POC/STATISTIC_NUMBER_OF_POC_SUCCESS", res.data);
    })
    .catch((err) => {
      dispatch({
        type: "POC/STATISTIC_NUMBER_OF_POC_FAIL",
        message: err.message,
      });
      console.log("POC/STATISTIC_NUMBER_OF_POC_FAIL", err.message);
    });
};
