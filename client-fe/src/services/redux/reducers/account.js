import { ListPocAccount } from "../../../assets/fakeData/fakeAccount";
const initialState = {
  listAccount: [],
  account: {
    username: "",
    password: "",
    tenantCode: "",
    role: "",
  },
  listPocAccount: [],
  listPocAccountAvailable: [],
  loading: false,
  success: false,
  failure: false,
  message: "",
  statistic: {},
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * Filing poc form
     */
    case "ACCOUNT/SELECT_ACCOUNT_FOR_POC": {
      const listPocAccountRemained = state.listPocAccountAvailable.filter(
        (account) => account.username !== action.payload
      );

      return {
        ...state,
        listPocAccountAvailable: listPocAccountRemained,
      };
    }

    case "ACCOUNT/RELEASE_ACCOUNT_FOR_POC": {
      const accountReleased = state.listPocAccount.find(
        (account) => account.username === action.payload
      );
      const listPocAccountRemained = [
        ...state.listPocAccountAvailable,
        accountReleased,
      ];

      return {
        ...state,
        listPocAccountAvailable: listPocAccountRemained,
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

    case "ACCOUNT/FETCH_LIST_POC_ACCOUNT_AVAILABLE": {
      return {
        ...state,
        loading: true,
      };
    }

    case "ACCOUNT/FETCH_LIST_POC_ACCOUNT_AVAILABLE_SUCCESS": {
      const listAccount = action.payload;
      return {
        ...state,
        loading: false,
        success: true,
        listPocAccountAvailable: listAccount,
      };
    }

    case "ACCOUNT/FETCH_LIST_POC_ACCOUNT_AVAILABLE_FAIL": {
      return {
        ...state,
        loading: false,
        failure: true,
        message: action.message,
      };
    }
    /**
     * Fetching poc account info
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
            active: action.payload.active,
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
     * Statistic
     */
    case "ACCOUNT/STATISTIC_NUMBER_OF_ACCOUNT": {
      return {
        ...state,
        loading: true,
      };
    }

    case "ACCOUNT/STATISTIC_NUMBER_OF_ACCOUNT_SUCCESS": {
      const newStatistic = {
        ...state.statistic,
        numberOfPocAccount: action.payload.numberOfPocAccounts,
      };
      return {
        ...state,
        loading: false,
        success: true,
        statistic: newStatistic,
      };
    }

    case "ACCOUNT/STATISTIC_NUMBER_OF_ACCOUNT_FAIL": {
      return {
        ...state,
        loading: false,
        failure: true,
        message: action.message,
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
