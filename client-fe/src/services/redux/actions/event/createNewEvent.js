import eventApi from "../../../../api/eventAPI";
import { createNewListPoc } from "../poc/createListPoc";
export const createNewEvent = (event, listPoc) => async (dispatch) => {
  dispatch({ type: "EVENT/CREATE_NEW_EVENT" });
  const params = {
    eventCode: event.code,
    eventName: event.name,
    isActivate: 1,
    eventDescription: event.note,
    startTime: event.start,
    endTime: event.end,
    eventImg: event.map,
    tenantCode: event.tenant.tenantCode,
  };
  console.log(params);
  const response = eventApi.addNew(params);

  response
    .then((res) => {
      dispatch(createNewListPoc(listPoc));
      dispatch({ type: "EVENT/CREATE_NEW_EVENT_SUCCESS", payload: res.data });
      console.log("EVENT/CREATE_NEW_EVENT_SUCCESS", res.data);
    })
    .catch((err) => {
      dispatch({ type: "EVENT/CREATE_NEW_EVENT_FAIL", message: err.message });
      console.log("EVENT/CREATE_NEW_EVENT_SUCCESS", err.message);
    });
};
