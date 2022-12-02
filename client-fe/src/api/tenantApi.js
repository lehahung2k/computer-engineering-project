import axios from "axios";

const baseUrl = "http://localhost:8080/tenant";

class TenantApi {
  getAll = (token) => {
    const url = baseUrl + "/";
    const config = {
      headers: { accessToken: token, "Content-Type": "application/json" },
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
}

const tenantApi = new TenantApi();
export default tenantApi;
