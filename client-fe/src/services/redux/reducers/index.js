import { combineReducers } from "redux";
import { pocReducer, listPocReducer } from "./poc";
import eventReducer from "./event";
import companyReducer from "./company";

const rootReducer = combineReducers({
  event: eventReducer,
  poc: pocReducer,
  listPoc: listPocReducer,
  company: companyReducer,
});

export default rootReducer;
