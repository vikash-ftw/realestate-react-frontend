import axios from 'axios';

const PROPERTY_API_BASE_URL = "http://localhost:8080/realEstate/LandProperty";

class PropertyApiService {
    
    fetchByCity(city){
        return axios.get(PROPERTY_API_BASE_URL + '/city' + '/' + city);
    }

    fetchByPriceRange(minPrice, maxPrice){
        return axios.get(PROPERTY_API_BASE_URL + "/priceBudget" + "/" + minPrice + "/" + maxPrice);
    }

    fetchByPriceGreaterThan(minPrice){
        return axios.get(PROPERTY_API_BASE_URL + "/greaterThanPrice" + "/" + minPrice);
    }

    fetchByDimension(length, breadth){
        return axios.get(PROPERTY_API_BASE_URL + "/dimension" + "/" + length + "/" + breadth);
    }

    fetchByPropertyType(propType){
        return axios.get(PROPERTY_API_BASE_URL + "/propType" + "/" + propType);
    }

    fetchByOwnershipType(ownershipType){
        return axios.get(PROPERTY_API_BASE_URL + "/ownershipType" + "/" + ownershipType);
    }
}

export default new PropertyApiService();