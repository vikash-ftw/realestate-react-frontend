import React, { Component } from "react";
import Axios from "axios";
class UpdateLandProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyType: "",
      ownershipType: "",
      landProperty: {
        propertyTitle: "",
        propertyArea: "",
        dimensionLength: "",
        dimensionBreadth: "",
        propertyPrice: "",
        latitude: "",
        longitude: "",
        propertyCity: "",
        propertyPincode: "",
        propertyRegistDate: "",
      },
    };
  }
  componentDidMount() {
    console.log("in update", this.props.landProperty);
    const propertyId = this.props.landProperty;
    Axios.get(
      `http://localhost:8080/realEstate/LandProperty/${propertyId}`
    ).then((res) => {
      console.log(res.data);
      this.setState({ landProperty: res.data });
      this.setState({ propertyType: res.data.propertyType });
      this.setState({ ownershipType: res.data.ownershipType });

      console.log(this.state.propertyType , this.state.ownershipType, "in land state");
    });
  }
  handleInputChange = (e) => {
    const landProperty = { ...this.state.landProperty };
    landProperty[e.currentTarget.name] = e.currentTarget.value;
    console.log(e.currentTarget.value);
    this.setState({ landProperty });
  };

  updateLandProperty = () => {
    console.log(this.state, "in update button");
    const {
      propertyTitle,
      propertyArea,
      dimensionLength,
      dimensionBreadth,
      propertyPrice,
      latitude,
      longitude,
      propertyCity,
      propertyPincode,
      propertyRegistDate,
    } = this.state.landProperty;
    const { propertyType, ownershipType } = this.state;
    console.log(this.state.landProperty.propertyType, "in update button");
    const propertyId = this.props.landProperty;
    Axios.put(
      `http://localhost:8080/realEstate/owner/updateProp/${this.props.user.id}/${propertyId}`,
      {
        propertyId: propertyId,
        propertyTitle: propertyTitle,
        propertyArea: dimensionBreadth * dimensionLength,
        dimensionLength: dimensionLength,
        dimensionBreadth: dimensionBreadth,
        propertyPrice: propertyPrice,
        propertyType: propertyType,
        ownershipType: ownershipType,
        latitude: latitude,
        longitude: longitude,
        propertyCity: propertyCity,
        propertyPincode: propertyPincode,
        propertyRegistDate: propertyRegistDate,
      }
    ).then((res) => {
      console.log(res.data, "updated data");
    });
  };
  render() {
    const {
      propertyTitle,
      dimensionLength,
      dimensionBreadth,
      propertyPrice,
      propertyType,
      ownershipType,
      latitude,
      longitude,
      propertyCity,
      propertyPincode,
    } = this.state.landProperty;
    const Area = dimensionBreadth * dimensionLength;
    return (
      <>
        <h2>update</h2>
        <form className="col-lg-6 offset-lg-3 justify-content-center">
          <div className="form-group">
            <label>Property Title</label>
            <input
              type="text"
              className="form-control"
              name="propertyTitle"
              value={propertyTitle}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Length</label>
            <input
              type="text"
              className="form-control"
              name="dimensionLength"
              value={dimensionLength}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Breadth</label>
            <input
              type="text"
              className="form-control"
              name="dimensionBreadth"
              value={dimensionBreadth}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Property Area</label>
            <input
              type="text"
              className="form-control"
              name="propertyArea"
              value={Area}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Property Price</label>
            <input
              type="text"
              className="form-control"
              name="propertyPrice"
              value={propertyPrice}
              onChange={this.handleInputChange}
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
              <option name="AGRICULTURAL" value="AGRICULTURAL">
                AGRICULTURAL
              </option>
              <option name="RENTAL" value="RENTAL">
                RENTAL
              </option>
              <option name="RESIDENTIAL" value="RESIDENTIAL">
                RESIDENTIAL
              </option>
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
              <option name="FREEHOLD" value="FREEHOLD">
                FREEHOLD
              </option>
              <option name="LEASEHOLD" value="LEASEHOLD">
                LEASEHOLD
              </option>
              <option name="POWEROFATTORNEY" value="POWEROFATTORNEY">
                POWEROFATTORNEY
              </option>
            </select>
          </div>
          <div className="form-group">
            <label>Latitude</label>
            <input
              type="text"
              className="form-control"
              name="latitude"
              value={latitude}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Longitude</label>
            <input
              type="text"
              className="form-control"
              name="longitude"
              value={longitude}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Property City</label>
            <input
              type="text"
              className="form-control"
              name="propertyCity"
              value={propertyCity}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Property Pincode</label>
            <input
              type="text"
              className="form-control"
              name="propertyPincode"
              value={propertyPincode}
              onChange={this.handleInputChange}
            />
          </div>
        </form>
        <div className="row">
          <div className="col text-center">
            <button
              className="btn btn-primary"
              onClick={this.updateLandProperty}
            >
              Update
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default UpdateLandProperty;
