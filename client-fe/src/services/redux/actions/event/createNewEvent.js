import eventApi from "../../../../api/eventAPI";

export const createNewEvent = () => async (dispatch) => {
  dispatch({ type: "EVENT/CREATE_NEW_EVENT" });

  const response = eventApi.addNew();

  response
    .then((res) => {
      dispatch({ type: "EVENT/CREATE_NEW_EVENT_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "EVENT/CREATE_NEW_EVENT_FAIL", message: err.message });
    });
};
