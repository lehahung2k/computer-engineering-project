import pocApi from "../../../../api/PocApi";

export const checkDeleteCondition = (listPointCode) => async (dispatch) => {
  dispatch({ type: "POC/CHECK_DELETE_CONDITION" });

  const params = { listPointCode: listPointCode };
  const response = pocApi.checkDeleteCondition(params);

  response
    .then((res) => {
      dispatch({
        type: "POC/CHECK_DELETE_CONDITION_SUCCESS",
        payload: res.data.check,
      });
    })
    .catch((err) => {
      dispatch({
        type: "POC/CHECK_DELETE_CONDITION_FAIL",
        message: err.message,
      });
    });
};

export const deletePoc = (listPointCode) => async (dispatch) => {
  dispatch({ type: "POC/DELETE_LIST_POC" });
};
