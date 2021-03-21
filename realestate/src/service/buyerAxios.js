import axios from 'axios';

const BUYER_API_BASE_URL = "http://localhost:8080/realEstate/buyer";

class BuyerApiService {

    fetchAllFavProperty(buyerId){
        console.log("calling fetch all fav props");
        return axios.get(BUYER_API_BASE_URL + '/allFav' + '/' + buyerId);
    }

    markFavProp(favProp){
        console.log("calling mark fav method");
        console.log(favProp);
        return axios.post( BUYER_API_BASE_URL + "/markFav", favProp);
    }

    unmarkFavProp(unfavProp){
        console.log("calling unmark fav method");
        return axios.put(BUYER_API_BASE_URL + "/unFav", unfavProp);
    }
}

export default new BuyerApiService();