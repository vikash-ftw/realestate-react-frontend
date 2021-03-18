import Axios from "axios";
import React from "react";
class OwnerDash extends React.Component {
  state = {
    id: this.props.user.id,
    landProperties: [
      {
        propertyTitle: "yes",
        propertyArea: "",
        dimensionLength: "",
        dimensionBreadth: "",
        propertyPrice: "",
        propertyType: "",
        ownershipType: "",
        latitude: "",
        longitude: "",
        propertyCity: "",
        propertyPincode: "",
        propertyRegistDate: "",
      },
    ],
  };

  componentDidMount() {
    this.props.onLogin("owner");
    Axios.get(
      `http://localhost:8080/realEstate/owner/myProperty/${localStorage.getItem(
        "actorId"
      )}`
    ).then((res) => {
      const land = res.data;
      this.setState({ landProperties: land });
    });
  }

  // "ownerId": 4,
  // "ownerName": "root",
  // "ownerEmail": "mangesh@gmail.com",
  // "ownerPassword": "root",
  // "ownerPhoneNo": "8208668672",
  // "ownerIdProof": "12345678",
  // "ownerCity": "pune",
  // "  ": null,
  // "ownerRegistDate": "1997-02-22",
  // "landProperties": []
  deleteProperty = (id) => {
    const ownerId = this.props.user.id;
    Axios.delete(
      `http://localhost:8080/realEstate/owner/deleteProp/${ownerId}/${id}`
    ).then((res) => {
      Axios.get(
        `http://localhost:8080/realEstate/owner/myProperty/${localStorage.getItem(
          "actorId"
        )}`
      ).then((res) => {
        const land = res.data;
        this.setState({ landProperties: land });
      });
    });
  };

  updateLandData = (propertyId) => {
    Axios.get(
      `http://localhost:8080/realEstate/LandProperty/${propertyId}`
    ).then((res) => {
      this.props.sendPropertyData(res.data)
      this.props.history.push("/updateLandProperty");
    });
  };

  render() {
    console.log("render called");
    const { name, email } = this.props.user;

    const list = this.state.landProperties;
    return (
      <>
        <div className="row">
          <br />
        </div>
        <div className="row">
          <div className="col-8">
            <h4>{name}'DashBoard</h4>
          </div>
          <div className="col">
            <h5>
              <button onClick={() => this.props.history.push("/propertyReg")}>
                +AddNewProperty
              </button>
            </h5>
          </div>
        </div>
        <div className="row">
          <br />
        </div>
        <div className="row"></div>
        {list.map((val) => {
          return (
            <div className="cart">
              <div className="row">
                Property
                <p>
                  Id : {val.propertyId} Area :{val.propertyArea}
                  Length :{val.dimensionLength}
                  Breadth :{val.dimensionBreadth}
                  Price :{val.propertyPrice}
                  Price :{val.ownershipType}
                  <button onClick={() => this.updateLandData(val.propertyId)}>
                    update
                  </button>
                  <button onClick={() => this.deleteProperty(val.propertyId)}>
                    delete
                  </button>
                </p>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}

export default OwnerDash;
// const {
//     propertyTitle,
//     propertyArea,
//     dimensionLength,
//     dimensionBreadth,
//     propertyPrice,
//     propertyType,
//     ownershipType,
//     latitude,
//     longitude,
//     propertyCity,
//     propertyPincode,
//     propertyRegistDate,
//   } = res.data;
