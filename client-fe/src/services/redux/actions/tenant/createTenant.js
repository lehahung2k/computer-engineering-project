import tenantApi from "../../../../api/TenantApi";
import { createAccount } from "../accounts/createAccount";

export const createNewTenant = (tenant) => async (dispatch) => {
  dispatch({ type: "TENANT/CREATE_NEW_TENANT" });
  const paramsTenant = tenant;
  const paramsAccount = { usename: tenant.username, password: tenant.password };

  const response = tenantApi.addNew(paramsTenant);

  response
    .then((res) => {
      dispatch(createAccount(paramsAccount));
      dispatch({ type: "TENANT/CREATE_NEW_TENANT_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "TENANT/CREATE_NEW_TENANT_FAIL", message: err.message });
    });
};
