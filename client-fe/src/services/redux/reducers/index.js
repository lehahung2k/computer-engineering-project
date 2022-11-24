import { combineReducers } from "redux";
import { pocReducer, listPocReducer } from "./poc";
import eventReducer from "./event";
import companyReducer from "./company";
import { updateEventReducer } from "./event/updateEvent";
import { createEventReducer } from "./event/createEvent";
import { deleteEventReducer } from "./event/deleteEvent";

const rootReducer = combineReducers({
  /**
   * Event reducers
   */
  eventInfo: eventReducer,
  eventCreate: createEventReducer,
  eventUpdate: updateEventReducer,
  eventDelete: deleteEventReducer,

  /**
   * POC reducers
   */
  poc: pocReducer,
  listPoc: listPocReducer,

  /**
   * Company (who organize event) reducers
   */
  company: companyReducer,
});

export default rootReducer;
