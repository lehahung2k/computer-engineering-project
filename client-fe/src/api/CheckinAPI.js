import axios from "axios";

class CheckinAPI{
    addNewCheckinClient=(params)=>{
        const url="http://localhost:8080/checkin/add-client";
        return axios.post(url,params);
    }
}

const checkinApi = new CheckinAPI();
export default checkinApi;