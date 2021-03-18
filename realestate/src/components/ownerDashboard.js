import Axios from "axios";
import React from "react";
class OwnerDash extends React.Component {
  state = {
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
  }

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
    return (
      <>
        <h2>{name}'DashBoard</h2>

      </>
    );
  }
}

export default OwnerDash;
