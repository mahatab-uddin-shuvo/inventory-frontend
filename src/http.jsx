import axios from 'axios';
import Cookies from 'universal-cookie';

export default axios.create({
    baseURL:process.env.REACT_APP_BASE_URL,
    headers:{
        "Content-type":"multipart/form-data",    
    }
}
)