import eventApi from "../../../../api/eventAPI";

export const deleteEvent = (event) => async (dispatch) => {
  dispatch({ type: "EVENT/DELETE_EVENT" });

  const response = eventApi.deleteEvent(event);

  response
    .then((res) => {
      dispatch({ type: "EVENT/DELETE_EVENT_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "EVENT/DELETE_EVENT_FAIL", message: err.message });
    });
};

export const checkDeleteCondition = (event) => async (dispatch) => {
  dispatch({ type: "EVENT/CHECK_DELETE_CONDITION" });

  const response = eventApi.checkDeleteCondition(event);

  response
    .then((res) => {
      if (res.data.check) {
        dispatch(deleteEvent(event));
      } else
        dispatch({
          type: "EVENT/CHECK_DELETE_CONDITION_SUCCESS",
          payload: res.data.check,
        });
    })
    .catch((err) => {
      dispatch({
        type: "EVENT/CHECK_DELETE_CONDITION_FAIL",
        message: err.message,
      });
    });
};
