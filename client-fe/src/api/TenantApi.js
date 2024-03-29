import axios from "axios";


const baseUrl = "https://checkin.love:27090/tenant";


class TenantApi {
  getAll = (token) => {
    const url = baseUrl + "/get-list-tenant";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.get(url, config);
  };

  addNew = (params, token) => {
    const url = baseUrl + "/add-tenant";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.post(url, params, config);
  };

  updateTenant = (params, token) => {
    const url = baseUrl + "/update-tenant";
    const config = {

      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },

    };
    return axios.put(url, params, config);
  };

  fetchTenantInfoByTenantCode = (params) => {
    const url = baseUrl + "/get-tenant-info-by-tenant-code";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.post(url, params, config);
  };

  fetchTenantInfo = () => {
    const url = baseUrl + "/get-tenant-info";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.get(url, config);
  };

  deleteTenant = (params) => {
    const url = baseUrl + "/delete-tenant";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.post(url, params, config);
  };

  checkDeleteCondition = (params) => {
    const url = baseUrl + "/check-delete-condition";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.post(url, params, config);
  };

  /**
   * Statistic
   */
  getNumberOfTenant = () => {
    const url = baseUrl + "/statistic/number-of-tenant";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.get(url, config);
  };
}

const tenantApi = new TenantApi();
export default tenantApi;
