import axios from "axios";

class PocApi{
    addNew = (params, token)=>{
        const url = "http://localhost:8080/point-of-checkin/add-point";
        const config = {
            headers: {  'accessToken': token,'Content-Type': 'application/json' }
        };
        return axios.post(url, config);
    }

    findAllBasedEventId = (params, token)=>{
        const url = "http://localhost:8080/point-of-checkin/"+params.id;
        const config = {
            headers: {  'accessToken': token,'Content-Type': 'application/json' }
        };
        return axios.get(url, config);
    }

    deletePoc = (params, token)=>{
        const url = "http://localhost:8080/point-of-checkin/"+params.event_id + '/delete-point/'+params.point_id;
        const config = {
            headers: {  'accessToken': token,'Content-Type': 'application/json' }
        };
        return axios.delete(url, config);
    }
}

const pocApi = new PocApi();
export default pocApi;