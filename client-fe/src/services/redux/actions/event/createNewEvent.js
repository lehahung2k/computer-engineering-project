import eventApi from "../../../../api/eventAPI";

export const createNewEvent = (event) => async (dispatch) => {
  dispatch({ type: "EVENT/CREATE_NEW_EVENT" });
  const params = {
    eventCode: event.code,
    eventName: event.name,
    isActivate: 1,
    eventDescription: event.note,
    startTime: event.start,
    endTime: event.end,
    eventImg: event.map,
  };
  console.log(params);
  const response = eventApi.addNew(params);

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
