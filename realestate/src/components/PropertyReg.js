import React, { Component } from "react";
import  Axios  from "axios";
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
      propertyRegistDate: new Date(),
    };
  }
  registerProperty = () => {
    const {
      ownerId,
      propertyTitle,
      propertyArea,
      dimensionLength,
      dimensionBreadth,
      propertyPrice,
      propertyType,
      ownershipType,
      latitude,
      longitude,
      propertyCity,
      propertyPincode,
      propertyRegistDate,
    } = this.state;
    Axios.post(
      `http://localhost:8080/realEstate/owner/newProperty/${ownerId}`,
      {
        propertyTitle : propertyTitle,
        propertyArea : propertyArea,
        dimensionLength : dimensionLength,
        dimensionBreadth : dimensionBreadth,
        propertyPrice :propertyPrice,
        propertyType : propertyType,
        ownershipType :ownershipType,
        latitude :latitude,
        longitude :longitude,
        propertyCity :propertyCity,
        propertyPincode : propertyPincode,
        propertyRegistDate : propertyRegistDate,
      }
    ).then((res) => {
        console.log(res.data)
    })
  };
  render() {
    console.log(this.state.ownershipType);
    return (
      <div className="row">
        <div className="col-7">
          <form>
            <div className="form-group">
              <label>PropertyTitle</label>
              <input
                type="text"
                className="form-control"
                id="propertyTitle"
                placeholder="Title"
                onChange={(e) => {
                  this.setState({ propertyTitle: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label>PropertyArea</label>
              <input
                type="text"
                className="form-control"
                id="propertyArea"
                placeholder="Area"
                onChange={(e) => {
                  this.setState({ propertyArea: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label>DimensionLength</label>
              <input
                type="text"
                className="form-control"
                placeholder="Length"
                onChange={(e) => {
                  this.setState({ dimensionLength: e.target.value });
                }}
              />
            </div>

            <div className="form-group">
              <label>DimensionBreadth</label>
              <input
                type="text"
                className="form-control"
                placeholder="Breadth"
                onChange={(e) => {
                  this.setState({ dimensionBreadth: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label>PropertyPrice</label>
              <input
                type="text"
                className="form-control"
                placeholder="Price"
                onChange={(e) => {
                  this.setState({ propertyPrice: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label>PropertyType</label>
              <select
                className="form-control"
                onChange={(e) => {
                  this.setState({ propertyType: e.target.value });
                }}
              >
                <option value="AGRICULTURAL">AGRICULTURAL</option>
                <option value="RENTAL">RENTAL</option>
                <option value="RESIDENTIAL">RESIDENTIAL</option>
              </select>
            </div>
            <div className="form-group">
              <label>OwnershipType</label>
              <select
                className="form-control"
                onChange={(e) => {
                  this.setState({ ownershipType: e.target.value });
                }}
              >
                <option value="FREEHOLD">FREEHOLD</option>
                <option value="LEASEHOLD">LEASEHOLD</option>
                <option value="POWEROFATTORNEY">POWEROFATTORNEY</option>
              </select>
            </div>
            <div className="form-group">
              <label>Latitude</label>
              <input
                type="text"
                className="form-control"
                placeholder={this.state.latitude}
                disabled
                onChange={(e) => {
                  this.setState({ latitude: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label>Longitude</label>
              <input
                type="text"
                className="form-control"
                placeholder={this.state.longitude}
                disabled
                onChange={(e) => {
                  this.setState({ longitude: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label>PropertyCity</label>
              <input
                type="text"
                className="form-control"
                placeholder="City"
                onChange={(e) => {
                  this.setState({ propertyCity: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label>PropertyPincode</label>
              <input
                type="text"
                className="form-control"
                placeholder="Pincode"
                onChange={(e) => {
                  this.setState({ propertyPincode: e.target.value });
                }}
              />
            </div>
          </form>
          <div className="row">
            <div className="col text-center">
              <button
                className="btn btn-primary"
                onClick={this.registerProperty}
              >
                Register
              </button>
            </div>
          </div>
        </div>
        <div className="col">Map</div>
      </div>
    );
  }
}

export default PropertyReg;
