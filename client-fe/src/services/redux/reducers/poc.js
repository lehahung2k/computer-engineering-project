const initialPoc = {
  name: "",
  code: "",
  account: "",
  note: "",
  eventCode: "",
};

const pocReducer = (state = initialPoc, action) => {
  switch (action.type) {
    case "NEW_POC": {
      const newEvent = action.payload;

      return newEvent;
    }

    case "NEW_NAME": {
      const newName = action.payload;

      return {
        ...state,
        name: newName,
      };
    }

    case "NEW_CODE": {
      const newCode = action.payload;

      return {
        ...state,
        code: newCode,
      };
    }

    case "NEW_ACCOUNT": {
      const newAccount = action.payload;

      return {
        ...state,
        account: newAccount,
      };
    }

    case "NEW_EVENT_CODE": {
      const newEventCode = action.payload;

      return {
        ...state,
        eventCode: newEventCode,
      };
    }

    case "NEW_NOTE": {
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
    case "ADD_POC": {
      const newList = state.map((e) => e);

      return [...newList, action.payload];
    }

    case "REMOVE_POC": {
      return state;
    }

    case "UPDATE_POC": {
      return state;
    }

    default:
      return state;
  }
};
export { pocReducer, listPocReducer };
