import axois from 'axios';

const instance=axois.create({
    baseURL:"http://192.168.0.33:8000/api/"
})
export default instance;