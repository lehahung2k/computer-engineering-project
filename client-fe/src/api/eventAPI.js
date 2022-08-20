import axios from 'axios';

class EventApi{
    getAll = ()=>{
        const url="http://localhost:8080/events-management";
        return axios.get(url);
    };

    addNew = (params)=>{
        const url='http://localhost:8080/events-management/add-event';
        return axios.post(url, params);
    };
}

const eventApi = new EventApi();
export default eventApi;