import axios from "axios";

class CheckinAPI{
    addNewCheckinClient=(params, token)=>{
        const url="http://localhost:8080/checkin/add-client";
        const config = {
            headers: {  'accessToken': token,'Content-Type': 'application/json' }
        };
        return axios.post(url,params, config);
    }

    getALLCheckinClient=()=>{
        const url="http://localhost:8080/checkin";
        
        return axios.get(url);
    }
}

const checkinApi = new CheckinAPI();
export default checkinApi;