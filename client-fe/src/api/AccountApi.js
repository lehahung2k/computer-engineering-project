import axios from "axios";

const baseUrl = "http://localhost:8080/auth";

class AccountApi {
  fetchListPocAccount = (params, token) => {
    const url = baseUrl + "/poc-account";
    const config = {
      headers: { accessToken: token, "Content-Type": "application/json" },
    };
    return axios.post(url, params, config);
  };

  fetchListPocAccountAdmin = (params, token) => {
    const url = baseUrl + "/poc-account";
    const config = {
      headers: { accessToken: token, "Content-Type": "application/json" },
    };
    return axios.post(url, params, config);
  };
}

const accountApi = new AccountApi();
export default accountApi;
