import axios from 'axios';

const PROPERTY_API_BASE_URL = "http://localhost:8080/realEstate/LandProperty";

class PropertyApiService {
    
    fetchByCity(city){
        return axios.get(PROPERTY_API_BASE_URL + '/city' + '/' + city);
    }
}

export default new PropertyApiService();