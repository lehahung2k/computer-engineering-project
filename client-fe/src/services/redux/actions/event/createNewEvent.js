import eventApi from "../../../../api/EventApi";
import { createNewListPoc } from "../poc/createListPoc";
export const createNewEvent = (event, listPoc) => async (dispatch) => {
  dispatch({ type: "EVENT/CREATE_NEW_EVENT" });
  const params = {
    eventCode: event.eventCode,
    eventName: event.eventName,
    isActivate: 1,
    eventDescription: event.eventDescription,
    startTime: event.startTime,
    endTime: event.endTime,
    eventImg: event.eventImg,
    tenantCode: event.tenantCode,
  };
  console.log(params);
  const response = eventApi.addNew(params);

  response
    .then((res) => {
      dispatch(createNewListPoc(listPoc, event.eventCode));
      dispatch({ type: "EVENT/CREATE_NEW_EVENT_SUCCESS", payload: res.data });
      console.log("EVENT/CREATE_NEW_EVENT_SUCCESS", res.data);
    })
    .catch((err) => {
      dispatch({ type: "EVENT/CREATE_NEW_EVENT_FAIL", message: err.message });
      console.log("EVENT/CREATE_NEW_EVENT_SUCCESS", err.message);
    });
};
