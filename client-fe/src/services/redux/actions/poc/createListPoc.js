import pocApi from "../../../../api/PocApi";

export const createNewListPoc = (listPoc, eventCode) => async (dispatch) => {
  dispatch({ type: "POC/CREATE_NEW_LIST_POC" });

  const response = pocApi.addNewList(listPoc, eventCode);

  response
    .then((res) => {
      dispatch({ type: "POC/CREATE_NEW_LIST_POC_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "POC/CREATE_NEW_LIST_FAIL", message: err.message });
    });
};
