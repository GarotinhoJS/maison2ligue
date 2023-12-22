import axios from "axios"
axios.defaults.withCredentials = true

export default  getUserProfile = async() => {
   const {data} = await axios.get('/api/profile');
   return data;
}