import { ListPocAccount } from "../../../assets/fakeData";

const initialState = {
  listPocAccount: ListPocAccount,
  account: {},
  loading: false,
  success: false,
  failure: false,
  message: "",
};

const pocAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default pocAccountReducer;
