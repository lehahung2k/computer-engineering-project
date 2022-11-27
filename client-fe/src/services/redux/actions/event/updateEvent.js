import eventApi from "../../../../api/eventAPI";

export const updateEvent = () => async (dispatch) => {
  dispatch({ type: "EVENT/UPDATE_EVENT" });

  const response = eventApi.updateEventInfo();

  response
    .then((res) => {
      dispatch({ type: "EVENT/UPDATE_EVENT_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "EVENT/UPDATE_EVENT_FAIL", message: err.message });
    });
};
