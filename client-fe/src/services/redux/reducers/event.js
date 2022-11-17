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
    case "EVENT/NEW_EVENT": {
      const newEvent = action.payload;

      return newEvent;
    }

    case "EVENT/NEW_NAME": {
      const newName = action.payload;

      return {
        ...state,
        name: newName,
      };
    }

    case "EVENT/NEW_CODE": {
      const newCode = action.payload;

      return {
        ...state,
        code: newCode,
      };
    }

    case "EVENT/NEW_START": {
      const newStart = action.payload;

      return {
        ...state,
        start: newStart,
      };
    }

    case "EVENT/NEW_END": {
      const newEnd = action.payload;

      return {
        ...state,
        end: newEnd,
      };
    }

    case "EVENT/NEW_NOTE": {
      const newNote = action.payload;

      return {
        ...state,
        note: newNote,
      };
    }

    case "EVENT/NEW_MAP": {
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
