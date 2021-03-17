import Axios from "axios";
import React from "react";
class OwnerDash extends React.Component {
  state = {
    id: "",
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    idProof: "",
    city: "",
    pinCode: "",
    regDate: "",
    listP: [],
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
    const id = this.props.actorId;
    this.props.onLogin(this.props.name, this.props.actorType);
    Axios.get(`http://localhost:8080/realEstate/owner/${id}`).then((res) => {
      const {
        ownerId,
        ownerName,
        ownerEmail,
        ownerPassword,
        ownerPhoneNo,
        ownerIdProof,
        ownerCity,
        ownerPincode,
        ownerRegistDate,
        landProperties,
      } = res.data;
      console.log(landProperties);
      this.setState({
        id: ownerIdProof,
        name: ownerName,
        email: ownerEmail,
        password: ownerPassword,
        phoneNo: ownerPhoneNo,
        idProof: ownerIdProof,
        city: ownerCity,
        pinCode: ownerPincode,
        regDate: ownerRegistDate,
        landProperties: landProperties,
      });
    });
    Axios.get(`http://localhost:8080/realEstate/owner/myProperty/${id}`).then(
      (response) => {
        this.setState({ landProperties: response.data });
        console.log(this.state.landProperties);
      }
    );
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
      return <>{this.state.name}
    </>;
  }
}

export default OwnerDash;
