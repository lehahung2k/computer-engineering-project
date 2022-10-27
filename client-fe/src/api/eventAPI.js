import axios from 'axios';

const baseUrl = 'https://event-managment-soict2022.herokuapp.com/events-management';

class EventApi{
    getAll = (token)=>{
        const url= baseUrl + "/";
        const config = {
            headers: {  'accessToken': token,'Content-Type': 'application/json' }
        };
        return axios.get(url, config);
    };

    searchByCode = (params)=>{
        const url= baseUrl + '/find-event-by-code/'+params['event_code'];
        return axios.get(url)
    }

    addNew = (params, token)=>{
        const url= baseUrl + '/add-event';
        const config = {
            headers: {  'accessToken': token,'Content-Type': 'application/json' }
        };
        return axios.post(url, params, config);
    };

    fetchEventInfo = (params, token)=>{
        const url= baseUrl + '/find-event-by-id/'+ params.id;
        const config = {
            headers: {  'accessToken': token,'Content-Type': 'application/json' }
        };
        return axios.get(url, config);
    };

    updateEventInfo = (params, token)=>{
        const url= baseUrl + '/update-event/'+ params.id;
        const config = {
            headers: {  'accessToken': token,'Content-Type': 'application/json' }
        };
        return axios.put(url,params.event, config);
    }

    deleteEvent = (params, token) =>{
        const url= baseUrl + '/delete-event-by-id/'+ params.id;
        const config = {
            headers: {  'accessToken': token}
        };
        return axios.delete(url, config);
    }
}

const eventApi = new EventApi();
export default eventApi;