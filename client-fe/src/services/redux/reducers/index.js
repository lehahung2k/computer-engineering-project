import { combineReducers } from "redux";
import { pocReducer, listPocReducer } from "./poc";
import eventReducer from "./event";
import tenantReducer from "./tenant";
import accountReducer from "./account";
import transactionReducer from "./transaction";

const rootReducer = combineReducers({
  /**
   * Event reducers
   */
  eventState: eventReducer,

  /**
   * POC reducers
   */
  pocState: pocReducer,

  /**
   * Company (who organize event) reducers
   */
  tenantState: tenantReducer,

  /**
   * Account
   */
  accountState: accountReducer,

  /**
   * Transaction check-in
   */
  transactionState: transactionReducer,
});

export default rootReducer;
