import dayjs from "dayjs";
import { listFakeEvents } from "../../../assets/fakeData/fakeEvent";
const initialState = {
  listEvents: [],
  event: {
    eventName: "",
    eventCode: "",
    startTime: dayjs("01-01-2000 00:00:00", "DD:MM:YYYY HH:mm:ss"),
    endTime: dayjs("01-01-2000 00:00:00", "DD:MM:YYYY HH:mm:ss"),
    eventDescription: "",
    eventImg: "",
    tenantCode: null,
  },
  pinnedEventId: null,
  loading: false,
  success: false,
  failure: false,
  message: "",
  enableDelete: false,
  statistic: {},
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
    case "EVENT/DELETE_EVENT": {
      return {
        ...state,
        loading: true,
        enableDelete: true,
      };
    }

    case "EVENT/DELETE_EVENT_SUCCESS": {
      return {
        ...state,
        loading: false,
        success: true,
      };
    }

    case "EVENT/DELETE_EVENT_FAIL": {
      return {
        ...state,
        loading: false,
        failure: true,
        message: action.message,
      };
    }

    case "EVENT/CHECK_DELETE_CONDITION": {
      return {
        ...state,
        loading: true,
      };
    }

    case "EVENT/CHECK_DELETE_CONDITION_SUCCESS": {
      return {
        ...state,
        loading: false,
        success: true,
        enableDelete: action.payload,
      };
    }

    case "EVENT/CHECK_DELETE_CONDITION_FAIL": {
      return {
        ...state,
        loading: false,
        failure: true,
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
        failure: true,
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
     * Statistic
     */

    case "EVENT/STATISTIC_NUMBER_OF_EVENT": {
      return {
        ...state,
        loading: true,
      };
    }

    case "EVENT/STATISTIC_NUMBER_OF_EVENT_SUCCESS": {
      const newStatistic = {
        ...state.statistic,
        numberOfEvent: action.payload.numberOfEvent,
      };
      return {
        ...state,
        loading: false,
        success: true,
        statistic: newStatistic,
      };
    }

    case "EVENT/STATISTIC_NUMBER_OF_EVENT_FAIL": {
      return {
        ...state,
        loading: false,
        failure: true,
        message: action.message,
      };
    }

    case "EVENT/STATISTIC_NUMBER_OF_GUEST/ALL": {
      return {
        ...state,
        loading: true,
      };
    }

    case "EVENT/STATISTIC_NUMBER_OF_GUEST_SUCCESS/ALL": {
      const newStatistic = {
        ...state.statistic,
        numberOfGuestAll: action.payload.numberOfGuest,
      };
      return {
        ...state,
        loading: false,
        success: true,
        statistic: newStatistic,
      };
    }

    case "EVENT/STATISTIC_NUMBER_OF_GUEST_FAIL/ALL": {
      return {
        ...state,
        loading: false,
        failure: true,
        message: action.message,
      };
    }

    case "EVENT/STATISTIC_NUMBER_OF_GUEST/EVENT": {
      return {
        ...state,
        loading: true,
      };
    }

    case "EVENT/STATISTIC_NUMBER_OF_GUEST_SUCCESS/EVENT": {
      const newStatistic = {
        ...state.statistic,
        numberOfGuestEvent: {
          eventCode: action.payload.eventCode,
          numberOfGuest: action.payload.numberOfGuest,
        },
      };
      return {
        ...state,
        loading: false,
        success: true,
        statistic: newStatistic,
      };
    }

    case "EVENT/STATISTIC_NUMBER_OF_GUEST_FAIL/EVENT": {
      return {
        ...state,
        loading: false,
        failure: true,
        message: action.message,
      };
    }

    case "EVENT/STATISTIC_NUMBER_OF_GUEST/POC": {
      return {
        ...state,
        loading: true,
      };
    }

    case "EVENT/STATISTIC_NUMBER_OF_GUEST_SUCCESS/POC": {
      const newStatistic = {
        ...state.statistic,
        numberOfGuest: action.payload.numberOfGuest,
      };
      return {
        ...state,
        loading: false,
        success: true,
        statistic: newStatistic,
      };
    }

    case "EVENT/STATISTIC_NUMBER_OF_GUEST_FAIL/POC": {
      return {
        ...state,
        loading: false,
        failure: true,
        message: action.message,
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

    case "EVENT/RESET_STATE": {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export default eventReducer;
