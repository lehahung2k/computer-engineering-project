const initialState = {
  loading: false,
  success: false,
  message: "",
};

export const deleteEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EVENT/DELETE_NEW_EVENT": {
      return {
        ...state,
        loading: true,
      };
    }

    case "EVENT/DELETE_NEW_EVENT_SUCCESS": {
      return {
        ...state,
        loading: false,
        success: true,
        message: "success",
      };
    }

    case "EVENT/DELETE_NEW_EVENT_FAIL": {
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
