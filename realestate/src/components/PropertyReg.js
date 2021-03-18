import React, { Component } from "react";
import Axios from "axios";
import Map from "./mapComponent";
import Register from './registrationChoice';
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
      propertyType: "AGRICULTURAL",
      ownershipType: "FREEHOLD",
      latitude: "",
      longitude: "",
      propertyCity: "",
      propertyPincode: "",
      propertyRegistDate: new Date(),
    };
  }
  receiveCoord = (coord) => {
    console.log(coord, "coord")
    const { lat, lng } = coord;
    this.setState({ latitude: lat, longitude: lng });
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
    console.log(this.state.propertyType);
    const {
      dimensionLength,
      dimensionBreadth,
      latitude,
      longitude,
    } = this.state;
    const Area = dimensionLength * dimensionBreadth;

    return (
      <div className="row">
        <div className="col-7">
          <form>
            <h4>Land Property Registeration Form</h4>
            <div className="form-group">
              <label>Property Title</label>
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
              <label>Length (ft)</label>
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
              <label>Breadth (ft)</label>
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
              <label>Property Area (sqft)</label>
              <input
                type="text"
                className="form-control"
                id="propertyArea"
                placeholder={Area}
                disabled
                onChange={(e) => {
                  this.setState({ propertyArea: Area });
                }}
              />
            </div>
            <div className="form-group">
              <label>Property Price</label>
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
              <label>Property Type</label>
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
              <label>Ownership Type</label>
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
              <label>Property City</label>
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
              <label>Property Pincode</label>
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
        <div className="col">
          <h4>Mark Your Property on Map</h4>
          <Map getCoord={ this.receiveCoord}/>
        </div>
      </div>
    );
  }
}

export default PropertyReg;
