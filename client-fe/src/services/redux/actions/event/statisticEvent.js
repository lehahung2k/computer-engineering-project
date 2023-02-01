import eventApi from "../../../../api/EventApi";
import guestApi from "../../../../api/GuestApi";

export const getNumberOfEvent = () => async (dispatch) => {
  dispatch({ type: "EVENT/STATISTIC_NUMBER_OF_EVENT" });

  const response = eventApi.getNumberOfEvent();

  response
    .then((res) => {
      dispatch({
        type: "EVENT/STATISTIC_NUMBER_OF_EVENT_SUCCESS",
        payload: res.data,
      });
      console.log("EVENT/STATISTIC_NUMBER_OF_EVENT_SUCCESS", res.data);
    })
    .catch((err) => {
      dispatch({
        type: "EVENT/STATISTIC_NUMBER_OF_EVENT_FAIL",
        message: err.message,
      });
      console.log("EVENT/STATISTIC_NUMBER_OF_EVENT_FAIL", err.message);
    });
};

export const getNumberOfGuestAll = () => async (dispatch) => {
  dispatch({ type: "EVENT/STATISTIC_NUMBER_OF_GUEST/ALL" });

  const response = guestApi.getNumberOfGuestAll();

  response
    .then((res) => {
      dispatch({
        type: "EVENT/STATISTIC_NUMBER_OF_GUEST_SUCCESS/ALL",
        payload: res.data,
      });
      console.log("EVENT/STATISTIC_NUMBER_OF_GUEST_SUCCESS/ALL", res.data);
    })
    .catch((err) => {
      dispatch({
        type: "EVENT/STATISTIC_NUMBER_OF_GUEST_FAIL/ALL",
        message: err.message,
      });
      console.log("EVENT/STATISTIC_NUMBER_OF_GUEST_FAIL/ALL", err.message);
    });
};

export const getNumberOfGuestEvent = (eventCode) => async (dispatch) => {
  dispatch({ type: "EVENT/STATISTIC_NUMBER_OF_GUEST" });

  const params = { eventCode: eventCode };
  const response = guestApi.getNumberOfGuestAll(params);

  response
    .then((res) => {
      dispatch({
        type: "EVENT/STATISTIC_NUMBER_OF_GUEST_SUCCESS",
        payload: res.data,
      });
      console.log("EVENT/STATISTIC_NUMBER_OF_GUEST_SUCCESS", res.data);
    })
    .catch((err) => {
      dispatch({
        type: "EVENT/STATISTIC_NUMBER_OF_GUEST_FAIL",
        message: err.message,
      });
      console.log("EVENT/STATISTIC_NUMBER_OF_GUEST_FAIL", err.message);
    });
};
