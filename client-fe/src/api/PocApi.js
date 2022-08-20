import axios from "axios";

class PocApi{
    addNew = (params)=>{
        const url = "http://localhost:8080/point-of-checkin/add-point";
        return axios.post(url, params);
    }

    findAll = (params)=>{
        const url = "http://localhost:8080/point-of-checkin";
        console.log(params);
        return axios.post(url, params);
    }
}

const pocApi = new PocApi();
export default pocApi;