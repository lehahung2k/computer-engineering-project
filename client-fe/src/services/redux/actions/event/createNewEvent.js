import eventApi from "../../../../api/eventAPI";

export const createNewEvent = (event) => async (dispatch) => {
  dispatch({ type: "EVENT/CREATE_NEW_EVENT" });

  const response = eventApi.addNew(event);

  response
    .then((res) => {
      dispatch({ type: "EVENT/CREATE_NEW_EVENT_SUCCESS", payload: res.data });
      console.log("EVENT/CREATE_NEW_EVENT_SUCCESS", res.data);
    })
    .catch((err) => {
      dispatch({ type: "EVENT/CREATE_NEW_EVENT_FAIL", message: err.message });
      console.log("EVENT/CREATE_NEW_EVENT_SUCCESS", err.message);
    });
};
