import axios from "axios";

const baseUrl = "https://checkin.love:27090/auth";

class AuthApi {
  loginApi = (data) => {
    const loginUrl = baseUrl + "/login";
    return axios.post(loginUrl, data);
  };
  registerApi = (data) => {
    const registerUrl = baseUrl + "/";
    return axios.post(registerUrl, data);
  };

  registerTenantAccount = (data) => {
    const registerUrl = baseUrl + "/";
    return axios.post(registerUrl, data);
  };
}

const authApi = new AuthApi();
export default authApi;
