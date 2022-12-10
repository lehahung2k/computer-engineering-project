import tenantApi from "../../../../api/TenantApi";

export const fetchListTenant = () => async (dispatch) => {
  dispatch({ type: "TENANT/FETCH_LIST_TENANT" });

  const response = tenantApi.getAll();

  response
    .then((res) => {
      dispatch({ type: "TENANT/FETCH_LIST_TENANT_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "TENANT/FETCH_LIST_TENANT_FAIL", message: err.message });
    });
};

export const fetchTenantInfoByTenantCode = (tenantCode) => async (dispatch) => {
  dispatch({ type: "TENANT/FETCH_TENANT_INFO" });

  const params = { tenantCode: tenantCode };
  const response = tenantApi.fetchTenantInfoByTenantCode(params.tenantCode);
};
