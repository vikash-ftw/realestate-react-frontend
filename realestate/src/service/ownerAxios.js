import Axios from "axios";
const Owner_API_BASE_URL = "http://localhost:8080/realEstate/owner";
class OwnerAxios {
  fetchOwner() {
    return Axios.get(Owner_API_BASE_URL);
  }
  fetchOwnerById(ownerId) {
    return Axios.get(Owner_API_BASE_URL + "/" + ownerId);
  }
  deleteOwner(ownerId) {
    return Axios.delete(Owner_API_BASE_URL + "/delete/" + ownerId);
  }
  fetchMyPropertyById(ownerId) {
    return Axios.get(Owner_API_BASE_URL + "/myProperty/" + ownerId);
  }
  deletePropertyByIdAndLandId(ownerId, landId) {
    return Axios.delete(
      Owner_API_BASE_URL + "/deleteProp/" + ownerId + "/" + landId
    );
  }
}

export default new OwnerAxios();
