import axios from "axios";

class PocApi{
    addNew = (params)=>{
        const url = "http://localhost:8080/point-of-checkin/add-point";
        return axios.post(url, params);
    }

    findAllBasedEventId = (params)=>{
        const url = "http://localhost:8080/point-of-checkin/"+params.id;
        return axios.get(url);
    }
}

const pocApi = new PocApi();
export default pocApi;