import { ListPocAccount } from "../../../assets/fakeData/index";
const initialState = {
  listAccount: ListPocAccount,
  account: {
    username: "",
    password: "",
    tenantCode: "",
    role: "",
  },
  listPocAccount: ListPocAccount,
  loading: false,
  success: false,
  failure: false,
  message: "",
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * Filing poc form
     */
    case "ACCOUNT/SELECT_ACCOUNT_FOR_POC": {
      const listPocAccountRemained = state.listPocAccount.filter(
        (account) => account.username !== action.payload
      );

      return {
        ...state,
        listPocAccount: listPocAccountRemained,
      };
    }

    /**
     * Posting create new account
     */
    case "ACCOUNT/CREATE_ACCOUNT": {
      return {
        ...state,
        loading: true,
      };
    }

    case "ACCOUNT/CREATE_ACCOUNT_SUCCESS": {
      return {
        ...state,
        loading: false,
        success: true,
        message: action.message,
      };
    }

    case "ACCOUNT/CREATE_ACCOUNT_FAIL": {
      return {
        ...state,
        loading: false,
        failure: true,
        message: action.message,
      };
    }

    /**
     * Delete account
     */

    /**
     * Fetching list account
     */
    case "ACCOUNT/FETCH_LIST_POC_ACCOUNT": {
      return {
        ...state,
        loading: true,
      };
    }

    case "ACCOUNT/FETCH_LIST_POC_ACCOUNT_SUCCESS": {
      const listAccount = action.payload;
      return {
        ...state,
        loading: false,
        success: true,
        listPocAccount: listAccount,
      };
    }

    case "ACCOUNT/FETCH_LIST_POC_ACCOUNT_FAIL": {
      return {
        ...state,
        loading: false,
        failure: true,
        message: action.message,
      };
    }
    /**
     * Fetching account info
     */
    case "ACCOUNT/FETCH_POC_ACCOUNT_INFO": {
      return {
        ...state,
        loading: true,
      };
    }

    case "ACCOUNT/FETCH_POC_ACCOUNT_INFO_SUCCESS": {
      return {
        ...state,
        loading: false,
        success: true,
        account: action.payload,
      };
    }

    case "ACCOUNT/FETCH_POC_ACCOUNT_INFO_FAIL": {
      return {
        ...state,
        loading: false,
        failure: true,
        message: action.message,
      };
    }

    /**
     * Update account
     */
    case "ACCOUNT/UPDATE_ACCOUNT": {
      return {
        ...state,
        loading: true,
      };
    }

    case "ACCOUNT/UPDATE_ACCOUNT_SUCCESS": {
      const updatedListPocAccount = state.listPocAccount.map((account) => {
        if (account.username === action.payload.username)
          return {
            ...account,
            active: 1,
          };
        return account;
      });

      return {
        ...state,
        loading: false,
        success: true,
        listPocAccount: updatedListPocAccount,
      };
    }

    case "ACCOUNT/UPDATE_ACCOUNT_FAIL": {
      return {
        ...state,
        loading: false,
        failure: true,
        message: action.message,
      };
    }

    case "ACCOUNT/RESET_API_STATE": {
      return {
        ...state,
        loading: false,
        success: false,
        message: "",
        failure: false,
      };
    }

    /**
     * Reset state
     */
    case "ACCOUNT/RESET_STATE": {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
};

export default accountReducer;
