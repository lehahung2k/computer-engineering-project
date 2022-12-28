import axios from "axios";

const baseUrl = "http://localhost:8080/transaction";
class CheckinAPI {
  /**
   * Thêm transaction check-in
   *
   * @param {Object} params {transactionObject: Object chứa thông tin transaction}
   * @returns Axios post promise
   */
  addNewCheckin = (params) => {
    const url = baseUrl + "/add-transaction";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.post(url, params, config);
  };

  /**
   * Lấy tất các các giao dịch check-in theo mã poc (thông tin check-in cho từng quầy)
   *
   * @param {Object} params {pointCode}
   * @returns Axios post promise
   */
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

  /**
   * Xóa các giao dịch check-in
   *
   * @param {list} params [danh sách các transaction cần xóa]
   * @returns Axios post promise
   */
  deleteCheckinInfo = (params) => {
    const url = baseUrl + "/delete-transaction";
    const config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    };
    return axios.post(url, params, config);
  };
}

const checkinApi = new CheckinAPI();
export default checkinApi;
