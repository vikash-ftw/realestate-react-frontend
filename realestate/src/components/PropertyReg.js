import React, { Component } from "react";
class PropertyReg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerId: this.props.user.id,
      propertyTitle: "",
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
    };
  }
  render() {
      return <div className='row'>
      <div className='col-7'></div><div className='col'></div></div>;
  }
}

export default PropertyReg;
