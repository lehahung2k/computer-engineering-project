import axios from "axios";


const baseUrl = "https://checkin.love:27090/events-management";


class EventApi {
  getAll = (token) => {
    const url = baseUrl + "/get-list-event";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.get(url, config);
  };

  addNew = (params, token) => {
    const url = baseUrl + "/add-event";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.post(url, params, config);
  };

  updateEventInfo = (params, token) => {
    const url = baseUrl + "/update-event";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.put(url, params, config);
  };

  deleteEvent = (params) => {
    const url = baseUrl + "/delete-event";
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
  getNumberOfEvent = () => {
    const url = baseUrl + "/statistic/number-of-event";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.get(url, config);
  };
}

const eventApi = new EventApi();
export default eventApi;
