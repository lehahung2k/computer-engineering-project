import eventApi from "../../../../api/eventAPI";

export const deleteEvent = () => async (dispatch) => {
  dispatch({ type: "EVENT/DELETE_EVENT" });

  const response = eventApi.deleteEvent();

  response
    .then((res) => {
      dispatch({ type: "EVENT/DELETE_EVENT_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "EVENT/DELETE_EVENT_FAIL", message: err.message });
    });
};
