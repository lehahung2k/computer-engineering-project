import dayjs from "dayjs";
const initialState = {
  listTransaction: [],
  transaction: {
    pointCode: "",
    guestCode: "",
    createTime: dayjs(),
    note: "",
    enable: true,
  },
  loading: false,
  failure: false,
  success: false,
  message: "",
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * Fetch list transaction
     */
    case "TRANSACTION/FETCH_LIST_TRANSACTION": {
      return {
        ...state,
        loading: true,
      };
    }

    case "TRANSACTION/FETCH_LIST_TRANSACTION_SUCCESS": {
      const listTransaction = action.payload;
      return {
        ...state,
        loading: false,
        success: true,
        listTransaction: listTransaction,
      };
    }

    case "TRANSACTION/FETCH_LIST_TRANSACTION_FAIL": {
      return {
        ...state,
        loading: false,
        failure: true,
        message: action.message,
      };
    }

    default: {
      return state;
    }
  }
};

export default transactionReducer;
