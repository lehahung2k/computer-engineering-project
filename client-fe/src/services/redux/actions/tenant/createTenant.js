import tenantApi from "../../../../api/tenantApi";
import { createAccount } from "../accounts/createAccount";

export const createNewTenant = (tenant, tenantAccount) => async (dispatch) => {
  dispatch({ type: "TENANT/CREATE_NEW_TENANT" });
  const paramsTenant = {
    tenantName: tenant.tenantName,
    tenantAddress: tenant.tenantAddress,
    website: tenant.website,
    contactName: tenant.contactName,
    contactEmail: tenant.contactEmail,
    contactPhone: tenant.contactPhone,
    tenantCode: tenant.tenantCode,
  };
  const paramsAccount = {
    username: tenantAccount.username,
    password: tenantAccount.password,
    active: 2,
    tenantCode: tenant.tenantCode,
    role: "tenant",
  };

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
