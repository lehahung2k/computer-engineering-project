const initialState = {
  event: {
    name: "",
    code: "",
    start: "",
    end: "",
    note: "",
    map: "",
  },
  loading: false,
  success: false,
  message: "",
};

export const createEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EVENT/CREATE_NEW_EVENT": {
      return {
        ...state,
        loading: true,
      };
    }

    case "EVENT/CREATE_NEW_EVENT_SUCCESS": {
      const newEvent = action.payload;
      return {
        ...state,
        loading: false,
        success: true,
        event: newEvent,
      };
    }

    case "EVENT/CREATE_NEW_EVENT_FAIL": {
      return {
        ...state,
        loading: false,
        success: false,
        message: action.message,
      };
    }
    default:
      return state;
  }
};
