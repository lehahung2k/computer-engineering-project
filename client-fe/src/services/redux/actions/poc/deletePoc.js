import pocApi from "../../../../api/PocApi";

export const checkDeleteCondition = (listPoc) => async (dispatch) => {
  dispatch({ type: "POC/CHECK_DELETE_CONDITION" });

  const response = pocApi.checkDeleteCondition(listPoc);

  response
    .then((res) => {
      if (res.data.check) {
        dispatch(deletePoc(listPoc));
      } else
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

export const deletePoc = (listPoc) => async (dispatch) => {
  dispatch({ type: "POC/DELETE_LIST_POC" });

  const response = pocApi.deleteListPoc(listPoc);

  response
    .then((res) => {
      dispatch({ type: "POC/DELETE_LIST_POC_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "POC/DELETE_LIST_POC_FAIL", message: err.message });
    });
};
