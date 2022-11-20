const initialPoc = {
  name: "",
  code: "",
  account: "",
  note: "",
  eventCode: "",
};

const pocReducer = (state = initialPoc, action) => {
  switch (action.type) {
    case "POC/NEW_POC": {
      const newEvent = action.payload;

      return newEvent;
    }

    case "POC/NEW_NAME": {
      const newName = action.payload;

      return {
        ...state,
        name: newName,
      };
    }

    case "POC/NEW_CODE": {
      const newCode = action.payload;

      return {
        ...state,
        code: newCode,
      };
    }

    case "POC/NEW_ACCOUNT": {
      const newAccount = action.payload;

      return {
        ...state,
        account: newAccount,
      };
    }

    case "POC/NEW_EVENT_CODE": {
      const newEventCode = action.payload;

      return {
        ...state,
        eventCode: newEventCode,
      };
    }

    case "POC/NEW_NOTE": {
      const newNote = action.payload;

      return {
        ...state,
        note: newNote,
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
