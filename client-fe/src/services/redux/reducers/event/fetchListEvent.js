const initialState = {
  loading: false,
  success: false,
  data: [],
  message: "",
};

export const fetchListEvent = (state = initialState, action) => {
  switch (action.type) {
    case "EVENT/FETCH_LIST_EVENT": {
      return {
        ...state,
        loading: true,
      };
    }

    case "EVENT/FETCH_LIST_EVENT_SUCCESS": {
      const listEvent = action.payload;
      return {
        ...state,
        loading: false,
        success: true,
        data: listEvent,
      };
    }

    case "EVENT/FETCH_LIST_EVENT_FAIL": {
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
