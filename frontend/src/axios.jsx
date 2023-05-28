import axios from 'axios'
import router from './router'

const axiosClient = axios.create({
   // GET BASE URL FROM .env
   baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => { // CONFIG CAN BE CONSIDERED THE REQUEST ITSELF
   const token = '1234'
   config.headers.Authorization = `Bearer ${token}`
   return config
})

axiosClient.interceptors.response.use((response) => { 
      return response
   }, 
   (error) => {
      if(error.response && error.response.status === 401){
         router.navigate('/login')
         return error
      }
      throw error
   }
)

export default axiosClient