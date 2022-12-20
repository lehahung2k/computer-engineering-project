import axios from "axios";

const baseUrl = "http://localhost:8080/point-of-checkin";
class PocApi {
  addNew = (params, token) => {
    const url = baseUrl + "/add-point";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.post(url, params, config);
  };

  addNewList = (params) => {
    const url = baseUrl + "/add-point";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };

    return axios.post(url, params, config);
  };

  updateListPoc = (params) => {
    const url = baseUrl + "/update-list-poc";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };

    return axios.put(url, params, config);
  };

  findAllBasedEventId = (params, token) => {
    const url = baseUrl + "/" + params.id;
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.get(url, config);
  };

  getAllByEventCode = (params, token) => {
    const url = baseUrl + "/get-all-poc-by-event-code";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.post(url, params, config);
  };

  fetchPocInfo = (params) => {
    const url = baseUrl + "/get-poc-info-by-username";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.post(url, params, config);
  };

  deleteListPoc = (params) => {
    const url = baseUrl + "/delete-point";
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

  // deletePoc = (params, token) => {
  //   const url =
  //     baseUrl + "/" + params.event_id + "/delete-point/" + params.point_id;
  //   const config = {
  //     headers: {
  //       Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   return axios.delete(url, config);
  // };

  // deleteAllPoc = (params, token) => {
  //   const url = baseUrl + "/delete-all-poc/" + params.event_id;
  //   const config = {
  //     headers: {
  //       Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   return axios.delete(url, config);
  // };
}

const pocApi = new PocApi();
export default pocApi;
