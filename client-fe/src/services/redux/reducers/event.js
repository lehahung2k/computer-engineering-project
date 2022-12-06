import dayjs from "dayjs";
import { listFakeEvents } from "../../../assets/fakeData/fakeEvent";
const initialState = {
  listEvents: listFakeEvents,
  event: {
    eventName: "",
    eventCode: "",
    startTime: dayjs(),
    endTime: dayjs(),
    eventDescription: "",
    eventImg: "",
    tenantCode: null,
  },
  pinnedEventId: null,
  loading: false,
  success: false,
  failure: false,
  message: "",
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * Filling event info form
     */
    case "EVENT/NEW_EVENT": {
      const newEvent = action.payload;

      return {
        ...state,
        event: newEvent,
      };
    }

    case "EVENT/NEW_NAME": {
      const newName = action.payload;
      const newEvent = { ...state.event, eventName: newName };

      return {
        ...state,
        event: newEvent,
      };
    }

    case "EVENT/NEW_CODE": {
      const newCode = action.payload;
      const newEvent = { ...state.event, eventCode: newCode };
      return {
        ...state,
        event: newEvent,
      };
    }

    case "EVENT/NEW_START": {
      const newStart = action.payload;
      const newEvent = { ...state.event, startTime: newStart };

      return {
        ...state,
        event: newEvent,
      };
    }

    case "EVENT/NEW_END": {
      const newEnd = action.payload;
      const newEvent = { ...state.event, endTime: newEnd };

      return {
        ...state,
        event: newEvent,
      };
    }

    case "EVENT/NEW_NOTE": {
      const newNote = action.payload;
      const newEvent = { ...state.event, eventDescription: newNote };

      return {
        ...state,
        event: newEvent,
      };
    }

    case "EVENT/NEW_MAP": {
      const newMap = action.payload;
      const newEvent = { ...state.event, eventImg: newMap };

      return {
        ...state,
        event: newEvent,
      };
    }

    case "EVENT/NEW_TENANT": {
      const newTenant = action.payload;
      const newEvent = { ...state.event, tenantCode: newTenant };

      return {
        ...state,
        event: newEvent,
      };
    }
    /**
     * Posting create new event
     */
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
        failure: true,
        message: action.message,
      };
    }

    /**
     * Delete event
     */
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

    /**
     * Fetching list events
     */
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
        listEvents: listEvent,
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

    /**
     * Update event
     */
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

    /**
     * Pin event for view detail
     */
    case "EVENT/PIN_EVENT": {
      return {
        ...state,
        pinnedEventId: action.payload,
      };
    }

    /**
     * Reset api status
     */
    case "EVENT/RESET_API_STATE": {
      return {
        ...state,
        loading: false,
        success: false,
        message: "",
        failure: false,
      };
    }
    default:
      return state;
  }
};

export default eventReducer;
