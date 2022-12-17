import axios from "axios";

const baseUrl = "https://checkin.love:27090/transaction";
class CheckinAPI {
  addNewCheckinClient = (params, token) => {
    const url = baseUrl + "/add-transaction";
    const config = {
      headers: { accessToken: token, "Content-Type": "application/json" },
    };
    return axios.post(url, params, config);
  };

  // getALLCheckinClient=()=>{
  //     const url= baseUrl + "/1";

  //     return axios.get(url);
  // }

  getAllTransactionByPointCode = (params) => {
    const url = baseUrl + "/get-all-by-point-code";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.post(url, params, config);
  };

  deleteCheckinInfo = (params, token) => {
    const url = baseUrl + "/delete-transaction/" + params.event_id;
    const config = {
      headers: { accessToken: token, "Content-Type": "application/json" },
    };
    return axios.delete(url, config);
  };
}

const checkinApi = new CheckinAPI();
export default checkinApi;
