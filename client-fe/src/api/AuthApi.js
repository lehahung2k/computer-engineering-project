import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8080/auth';

class AuthApi {
    loginApi = (data) => {
        const loginUrl = baseUrl + '/login';
        return axios.post(loginUrl, data);
    }
    registerApi = (data) => {
        const registerUrl = baseUrl + '/';
        return axios.post(registerUrl, data);
    }
}

const authApi = new AuthApi();
export default authApi;