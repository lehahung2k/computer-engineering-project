const initialPoc = {
  listPoc: [],
  poc: {
    pointName: "",
    pointCode: "",
    username: "",
    pointNote: "",
    eventCode: "",
  },
  loading: false,
  success: false,
  failure: false,
  message: "",
};

const pocReducer = (state = initialPoc, action) => {
  switch (action.type) {
    /**
     * Filling poc info form
     */
    case "POC/NEW_POC": {
      const newPoc = action.payload;

      return {
        ...state,
        poc: newPoc,
      };
    }

    case "POC/NEW_NAME": {
      const newName = action.payload;
      const newPoc = { ...state.poc, pointName: newName };
      return {
        ...state,
        poc: newPoc,
      };
    }

    case "POC/NEW_CODE": {
      const newCode = action.payload;
      const newPoc = { ...state.poc, pointCode: newCode };

      return {
        ...state,
        poc: newPoc,
      };
    }

    case "POC/NEW_ACCOUNT": {
      const newAccount = action.payload;
      const newPoc = { ...state.poc, username: newAccount };

      return {
        ...state,
        poc: newPoc,
      };
    }

    case "POC/NEW_EVENT_CODE": {
      const newEventCode = action.payload;
      const newPoc = { ...state.poc, eventCode: newEventCode };

      return {
        ...state,
        poc: newPoc,
      };
    }

    case "POC/NEW_NOTE": {
      const newNote = action.payload;
      const newPoc = { ...state.poc, pointNote: newNote };

      return {
        ...state,
        poc: newPoc,
      };
    }

    case "POC/ADD_POC": {
      const newList = [...state.listPoc, action.payload];

      return { ...state, listPoc: newList };
    }

    case "POC/REMOVE_POC": {
      return state;
    }

    case "POC/UPDATE_POC": {
      return state;
    }

    /**
     * Fetching list poc
     */
    case "POC/FETCH_LIST_POC": {
      return {
        ...state,
        loading: true,
      };
    }

    case "POC/FETCH_LIST_POC_SUCCESS": {
      return {
        ...state,
        loading: false,
        listPoc: action.payload,
        success: true,
      };
    }

    case "POC/FETCH_LIST_POC_FAIL": {
      return {
        ...state,
        loading: false,
        failure: true,
        message: action.message,
      };
    }
    /**
     * Fetch poc info
     */
    case "POC/FETCH_POC_INFO": {
      return {
        ...state,
        loading: true,
      };
    }

    case "POC/FETCH_POC_INFO_SUCCESS": {
      return {
        ...state,
        loading: false,
        success: true,
        poc: action.payload,
      };
    }

    case "POC/FETCH_POC_INFO_FAIL": {
      return {
        ...state,
        loading: false,
        failure: true,
        message: action.message,
      };
    }

    /**
     * Posting create new list poc
     */
    case "POC/CREATE_NEW_LIST_POC": {
      return {
        ...state,
        loading: true,
      };
    }

    case "POC/CREATE_NEW_LIST_POC_SUCCESS": {
      const newList = action.payload;
      return {
        ...state,
        loading: false,
        success: true,
        listPoc: newList,
      };
    }

    case "POC/CREATE_NEW_LIST_FAIL": {
      return {
        ...state,
        loading: false,
        failure: true,
        message: action.message,
      };
    }

    default:
      return state;
  }
};

const listPocReducer = (state = [], action) => {
  switch (action.type) {
    case "POC/ADD_POC": {
      const newList = state.map((e) => e);

      return [...newList, action.payload];
    }

    case "POC/REMOVE_POC": {
      return state;
    }

    case "POC/UPDATE_POC": {
      return state;
    }

    default:
      return state;
  }
};
export { pocReducer, listPocReducer };
