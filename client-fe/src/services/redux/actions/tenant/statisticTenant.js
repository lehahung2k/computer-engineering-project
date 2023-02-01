import tenantApi from "../../../../api/TenantApi";

export const getNumberOfTenant = () => async (dispatch) => {
  dispatch({ type: "TENANT/STATISTIC_NUMBER_OF_TENANT" });

  const response = tenantApi.getNumberOfTenant();

  response
    .then((res) => {
      dispatch({
        type: "TENANT/STATISTIC_NUMBER_OF_TENANT_SUCCESS",
        payload: res.data,
      });
      console.log("TENANT/STATISTIC_NUMBER_OF_TENANT_SUCCESS", res.data);
    })
    .catch((err) => {
      dispatch({
        type: "TENANT/STATISTIC_NUMBER_OF_TENANT_FAIL",
        message: err.message,
      });
      console.log("TENANT/STATISTIC_NUMBER_OF_TENANT_FAIL", err.message);
    });
};
