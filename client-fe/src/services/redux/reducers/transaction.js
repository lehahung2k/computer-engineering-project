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
     * Set transaction info
     */
    case "TRANSACTION/SET_TRANSACTION_INFO": {
      const newTransactionInfo = structuredClone(action.payload);

      const newState = structuredClone(state);

      return {
        ...newState,
        transaction: newTransactionInfo,
      };
    }

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

    /**
     * Delete list transaction
     */
    case "TRANSACTION/DELETE_LIST_TRANSACTION": {
      return {
        ...state,
        loading: true,
      };
    }

    case "TRANSACTION/DELETE_LIST_TRANSACTION_SUCCESS": {
      return {
        ...state,
        loading: false,
        success: true,
        listTransaction: action.payload,
      };
    }

    case "TRANSACTION/DELETE_LIST_TRANSACTION_FAIL": {
      return {
        ...state,
        loading: false,
        failure: true,
        message: action.message,
      };
    }

    /**
     * Reset
     */
    case "TRANSACTION/RESET_API_STATE": {
      return {
        ...state,
        loading: false,
        success: false,
        failure: false,
        message: "",
      };
    }
    default: {
      return state;
    }
  }
};

export default transactionReducer;
