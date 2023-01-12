import axios from "axios";

const baseUrl = "http://localhost:8080/guest";

class GuestApi {
  /**
   * Statistic
   */
  getNumberOfGuestAll = () => {
    const url = baseUrl + "/statistic/number-of-guest";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.get(url, config);
  };

  getNumberOfGuestEvent = (params) => {
    const url = baseUrl + "/statistic/number-of-guest-event";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.post(url, params, config);
  };
}

const guestApi = new GuestApi();
export default guestApi;
