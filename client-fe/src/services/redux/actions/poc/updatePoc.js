import pocApi from "../../../../api/PocApi";

export const updateListPoc = (listPoc, eventCode) => async (dispatch) => {
  dispatch({ type: "POC/UPDATE_LIST_POC" });
  console.log(listPoc);
  const params = listPoc.map((poc) => ({
    ...poc,
    eventCode: eventCode,
  }));

  const response = pocApi.updateListPoc(params);

  response
    .then((res) => {
      dispatch({ type: "POC/UPDATE_LIST_POC_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "POC/UPDATE_LIST_FAIL", message: err.message });
    });
};
