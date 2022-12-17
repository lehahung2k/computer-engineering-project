import axios from "axios";

const baseUrl = "https://checkin.love:27090/auth";

class AccountApi {
  fetchListPocAccount = (token) => {
    const url = baseUrl + "/get-list-poc-account";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.get(url, config);
  };

  fetchListPocAccountAdmin = (params, token) => {
    const url = baseUrl + "/poc-account";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.post(url, params, config);
  };

  fetchPocAccountInfoByUsername = (params) => {
    const url = baseUrl + "/get-account-info-by-username";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };

    return axios.post(url, params, config);
  };

  updatePocAccount = (params, token) => {
    const url = baseUrl + "/update-account";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.put(url, params, config);
  };
}

const accountApi = new AccountApi();
export default accountApi;
