import tenantApi from "../../../../api/TenantApi";

export const updateTenant = (tenant, id) => async (dispatch) => {
  dispatch({ type: "TENANT/UPDATE_TENANT" });

  const params = {
    ...tenant,
    id: id,
  };
  console.log(params);
  const response = tenantApi.updateTenant(params);

  response
    .then((res) => {
      dispatch({ type: "TENANT/UPDATE_TENANT_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "TENANT/UPDATE_TENANT_FAIL", message: err.message });
    });
};
