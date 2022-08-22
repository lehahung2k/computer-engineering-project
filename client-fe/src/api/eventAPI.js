import axios from 'axios';

class EventApi{
    getAll = (token)=>{
        const url="http://localhost:8080/events-management";
        const config = {
            headers: {  'accessToken': token,'Content-Type': 'application/json' }
        };
        return axios.get(url, config);
    };

    addNew = (params, token)=>{
        const url='http://localhost:8080/events-management/add-event';
        const config = {
            headers: {  'accessToken': token,'Content-Type': 'application/json' }
        };
        return axios.post(url, params, config);
    };

    fetchEventInfo = (params, token)=>{
        const url='http://localhost:8080/events-management/find-event-by-id/'+ params.id;
        const config = {
            headers: {  'accessToken': token,'Content-Type': 'application/json' }
        };
        return axios.get(url, config);
    };
}

const eventApi = new EventApi();
export default eventApi;