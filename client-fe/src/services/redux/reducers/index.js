import { combineReducers } from "redux";
import { pocReducer, listPocReducer } from "./poc";
import eventReducer from "./event";

const rootReducer = combineReducers({
  event: eventReducer,
  poc: pocReducer,
  listPoc: listPocReducer,
});

export default rootReducer;
