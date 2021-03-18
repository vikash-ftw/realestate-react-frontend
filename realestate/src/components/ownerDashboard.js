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
      `http://localhost:8080/realEstate/owner/myProperty/${this.props.user.id}`
    ).then((res) => {
      //console.log(res.data);
      const land = res.data;
      this.setState({ landProperties: land });
      console.log(this.state.landProperties, "land");
      console.log(land)
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

  render() {
    const { name, email } = this.props.user;
    console.log(this.props.user, "ownerDash");
    const list = this.state.landProperties;
    console.log(list , 'list in render')
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
              <button>+AddNewProperty</button>
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
                <p>
                  Id : {val.propertyId} Area :{val.propertyArea} 
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
  //   propertyTitle,
  //   propertyArea,
  //   dimensionLength,
  //   dimensionBreadth,
  //   propertyPrice,
  //   propertyType,
  //   ownershipType,
  //   latitude,
  //   longitude,
  //   propertyCity,
  //   propertyPincode,
  //   propertyRegistDate,
  // } = res.data;