import tenantApi from "../../../../api/TenantApi";

export const createNewTenant = (tenant) => async (dispatch) => {
  dispatch({ type: "TENANT/CREATE_NEW_TENANT" });
  const params = tenant;

  const response = tenantApi.addNew(params);

  response
    .then((res) => {
      dispatch({ type: "TENANT/CREATE_NEW_TENANT_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "TENANT/CREATE_NEW_TENANT_FAIL", message: err.message });
    });
};
