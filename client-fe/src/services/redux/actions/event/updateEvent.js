import eventApi from "../../../../api/EventApi";
import { updateListPoc } from "../poc/updatePoc";

export const updateEvent = (event, listPoc) => async (dispatch) => {
  dispatch({ type: "EVENT/UPDATE_EVENT" });

  const response = eventApi.updateEventInfo(event);

  response
    .then((res) => {
      dispatch(updateListPoc(listPoc, event.eventCode));
      dispatch({ type: "EVENT/UPDATE_EVENT_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "EVENT/UPDATE_EVENT_FAIL", message: err.message });
    });
};
