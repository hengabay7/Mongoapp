import axios from 'axios';

const baseUrl = 'http://localhost:3001/api';

const register = async(data) => {
    const respones = await axios.post(baseUrl + '/account/register', data);
    if(respones.data){
        localStorage.setItem('user',JSON.stringify(respones.data))
    }
    return respones.data;
}

const login = async(data) => {
    const respones = await axios.post(baseUrl + '/account/login', data);
    if(respones.data){
        localStorage.setItem('user',JSON.stringify(respones.data))
    }
    return respones.data;
}



const logout = async() => {
    localStorage.removeItem('user');
}



const actions = {
    register,
    login,
    logout
}

export default actions;