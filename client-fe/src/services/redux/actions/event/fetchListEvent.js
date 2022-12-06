import eventApi from "../../../../api/eventAPI";

export const fetchListEventAdmin = () => async (dispatch) => {
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
