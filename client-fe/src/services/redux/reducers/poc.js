const initialPoc = {
  listPoc: [],
  poc: {
    pointName: "",
    pointCode: "",
    username: "",
    pointNote: "",
    eventCode: "",
    enable: true,
  },
  loading: false,
  success: false,
  failure: false,
  enableDelete: false,
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

    case "POC/NEW_LIST_POC": {
      const newList = action.payload;

      return { ...state, listPoc: newList };
    }

    /**
     * Delete poc in state redux
     */
    case "POC/REMOVE_POC": {
      const removeIndex = state.listPoc
        .map((poc) => poc.pointCode)
        .indexOf(action.payload);

      if (removeIndex === -1) {
        return state;
      } else {
        const newListPoc = [
          ...state.listPoc.slice(0, removeIndex),
          ...state.listPoc.slice(removeIndex + 1),
        ];
        return {
          ...state,
          listPoc: newListPoc,
        };
      }
    }

    case "POC/UPDATE_POC": {
      const cloneListPoc = structuredClone(state.listPoc);
      const updatePoc = action.payload.poc;
      const updateIndex = cloneListPoc
        .map((poc) => poc.pointCode)
        .indexOf(updatePoc.pointCode);
      if (updateIndex === -1) return state;
      const newListPoc = [
        ...cloneListPoc.slice(0, updateIndex),
        updatePoc,
        ...cloneListPoc.slice(updateIndex + 1),
      ];
      console.log("Clone list poc", newListPoc);
      return {
        ...state,
        listPoc: newListPoc,
      };
    }

    /**
     * Delete poc in server
     */
    case "POC/CHECK_DELETE_CONDITION": {
      return {
        ...state,
        loading: true,
      };
    }

    case "POC/CHECK_DELETE_CONDITION_SUCCESS": {
      return {
        ...state,
        loading: false,
        success: true,
        enableDelete: action.payload,
      };
    }

    case "POC/CHECK_DELETE_CONDITION_FAIL": {
      return {
        ...state,
        loading: false,
        failure: true,
        message: action.message,
      };
    }

    case "POC/DELETE_LIST_POC": {
      return {
        ...state,
        loading: true,
        enableDelete: true,
      };
    }

    case "POC/DELETE_LIST_POC_SUCCESS": {
      const newListPoc = structuredClone(action.payload);
      const newState = structuredClone(state);

      return {
        ...newState,
        listPoc: newListPoc,
        loading: false,
        success: true,
      };
    }

    case "POC/DELETE_LIST_POC_FAIL": {
      return {
        ...state,
        loading: false,
        failure: true,
        message: action.message,
      };
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

    /**
     * Reset state
     */
    case "POC/RESET_STATE": {
      return {
        ...initialPoc,
      };
    }

    /**
     * Update list poc
     */
    case "POC/UPDATE_LIST_POC": {
      return {
        ...state,
        loading: true,
      };
    }

    case "POC/UPDATE_LIST_POC_SUCCESS": {
      return {
        ...state,
        loading: false,
        success: true,
      };
    }

    case "POC/UPDATE_LIST_POC_FAIL": {
      return {
        ...state,
        loading: false,
        failure: true,
      };
    }

    default:
      return state;
  }
};

// const listPocReducer = (state = [], action) => {
//   switch (action.type) {
//     case "POC/ADD_POC": {
//       const newList = state.map((e) => e);

//       return [...newList, action.payload];
//     }

//     case "POC/REMOVE_POC": {
//       return state;
//     }

//     case "POC/UPDATE_POC": {
//       return state;
//     }

//     default:
//       return state;
//   }
// };
export { pocReducer };
