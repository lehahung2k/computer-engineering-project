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

export const updateEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EVENT/UPDATE_EVENT": {
      return {
        ...state,
        loading: true,
      };
    }

    case "EVENT/UPDATE_EVENT_SUCCESS": {
      const eventUpdated = action.payload;
      return {
        ...state,
        loading: false,
        success: true,
        event: eventUpdated,
      };
    }

    case "EVENT/UPDATE_EVENT_FAIL": {
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
