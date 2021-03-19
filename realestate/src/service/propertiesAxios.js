import axios from 'axios';

const Property_API_BASE_URL = "http://localhost:8080/realEstate/LandProperty";

class PropertyApiService {
    
    fetchByCity(city){
        console.log("calling axios service");
        console.log("city",city);
        return axios.get(Property_API_BASE_URL + '/city' + '/' + city);
    }
}

export default new PropertyApiService();