const initialEvent = {
  name: "",
  code: "",
  start: "",
  end: "",
  note: "",
  map: "",
};

const eventReducer = (state = initialEvent, action) => {
  switch (action.type) {
    case "NEW_EVENT": {
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

    case "NEW_START": {
      const newStart = action.payload;

      return {
        ...state,
        start: newStart,
      };
    }

    case "NEW_END": {
      const newEnd = action.payload;

      return {
        ...state,
        end: newEnd,
      };
    }

    case "NEW_NOTE": {
      const newNote = action.payload;

      return {
        ...state,
        note: newNote,
      };
    }

    case "NEW_MAP": {
      const newMap = action.payload;

      return {
        ...state,
        map: newMap,
      };
    }

    default:
      return state;
  }
};

export default eventReducer;
