import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: 'https://server-2-80a59-default-rtdb.europe-west1.firebasedatabase.app/budget'
})

export default axiosAPI;