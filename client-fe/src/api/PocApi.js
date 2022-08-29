import axios from "axios";

const baseUrl = 'http://localhost:8080/point-of-checkin';
class PocApi{
    addNew = (params, token)=>{
        const url = baseUrl + "/add-point";
        const config = {
            headers: {  'accessToken': token,'Content-Type': 'application/json' }
        };
        return axios.post(url,params, config);
    }

    findAllBasedEventId = (params, token)=>{
        const url = baseUrl + "/"+params.id;
        const config = {
            headers: {  'accessToken': token,'Content-Type': 'application/json' }
        };
        return axios.get(url, config);
    }

    deletePoc = (params, token)=>{
        const url = baseUrl + "/"+params.event_id + '/delete-point/'+params.point_id;
        const config = {
            headers: {  'accessToken': token,'Content-Type': 'application/json' }
        };
        return axios.delete(url, config);
    }

    deleteAllPoc = (params, token)=>{
        const url = baseUrl + "/delete-all-poc/"+params.event_id;
        const config = {
            headers: {  'accessToken': token,'Content-Type': 'application/json' }
        };
        return axios.delete(url, config);
    }
}

const pocApi = new PocApi();
export default pocApi;