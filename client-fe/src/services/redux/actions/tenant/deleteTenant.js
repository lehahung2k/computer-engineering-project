import tenantAPI from "../../../../api/tenantApi";

export const deleteTenant = (listTenant) => async (dispatch) => {
  dispatch({ type: "TENANT/DELETE_TENANT" });

  const response = tenantAPI.deleteTenant(listTenant);

  response
    .then((res) => {
      dispatch({ type: "TENANT/DELETE_TENANT_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "TENANT/DELETE_TENANT_FAIL", message: err.message });
    });
};

export const checkDeleteCondition = (listTenant) => async (dispatch) => {
  dispatch({ type: "TENANT/CHECK_DELETE_CONDITION" });

  const response = tenantAPI.checkDeleteCondition(listTenant);

  response
    .then((res) => {
      if (res.data.check) {
        dispatch(deleteTenant(listTenant));
      } else
        dispatch({
          type: "TENANT/CHECK_DELETE_CONDITION_SUCCESS",
          payload: res.data.check,
        });
    })
    .catch((err) => {
      dispatch({
        type: "TENANT/CHECK_DELETE_CONDITION_FAIL",
        message: err.message,
      });
    });
};
