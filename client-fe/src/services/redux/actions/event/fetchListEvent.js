import eventApi from "../../../../api/EventApi";

export const fetchListEvent = () => async (dispatch) => {
  dispatch({ type: "EVENT/FETCH_LIST_EVENT" });

  const response = eventApi.getAll();

  response
    .then((res) => {
      dispatch({ type: "EVENT/FETCH_LIST_EVENT_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "EVENT/FETCH_LIST_EVENT_FAIL", message: err.message });
    });
};

export const fetchListEventByUsername = () => async (dispatch) => {
  dispatch({ type: "EVENT/FETCH_LIST_EVENT" });

  const response = eventApi.getAll();
  response
    .then((res) => {
      dispatch({ type: "EVENT/FETCH_LIST_EVENT_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "EVENT/FETCH_LIST_EVENT_FAIL", message: err.message });
    });
};
