import axios from 'axios';

const BUYER_API_BASE_URL = "http://localhost:8080/realEstate/buyer";

class BuyerApiService {

    fetchAllFavProperty(buyerId){
        console.log("calling fetch all fav props");
        return axios.get(BUYER_API_BASE_URL + '/allFav' + '/' + buyerId);
    }
}

export default new BuyerApiService();