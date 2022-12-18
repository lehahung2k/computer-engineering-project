import axios from "axios";

const baseUrl = "http://localhost:8080/tenant";

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
      headers: { accessToken: token, "Content-Type": "application/json" },
    };
    return axios.post(url, params, config);
  };

  updateTenant = (params, token) => {
    const url = baseUrl + "/update-tenant";
    const config = {
      headers: { accessToken: token, "Content-Type": "application/json" },
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

  fetchTenantInfoByAccount = () => {
    const url = baseUrl + "/get-tenant-info-by-account";
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
