import pocApi from "../../../../api/PocApi";

export const createNewListPoc = (listPoc, eventCode) => async (dispatch) => {
  dispatch({ type: "POC/CREATE_NEW_LIST_POC" });
  console.log(listPoc);
  const params = listPoc.map((poc) => ({
    ...poc,
    eventCode: eventCode,
  }));

  const response = pocApi.addNewList(params);

  response
    .then((res) => {
      dispatch({ type: "POC/CREATE_NEW_LIST_POC_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "POC/CREATE_NEW_LIST_FAIL", message: err.message });
    });
};
