import React, { Component } from "react";
import Axios from "axios";
import Map from "./mapComponent";
import Joi from 'joi-browser';

class PropertyReg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      property: {
        propertyTitle: "",
        propertyArea: 0,
        dimensionLength: "",
        dimensionBreadth: "",
        propertyPrice: "",
        propertyType: "AGRICULTURAL",
        ownershipType: "FREEHOLD",
        latitude: "",
        longitude: "",
        propertyCity: "",
        propertyPincode: "",
      },
      propertyRegistDate: new Date(),
      errors:{},
    };
  }

  schema = {
    propertyTitle: Joi.string().max(30).required().label("Title"),
    propertyArea: Joi.number().required().label("Area"),
    dimensionLength: Joi.number().required().label("Length"),
    dimensionBreadth: Joi.number().required().label("Breadth"),
    propertyPrice: Joi.number().required().label("Price"),
    propertyType: Joi.string().required().label("Property Type"),
    ownershipType: Joi.string().required().label("Ownership Type"),
    latitude: Joi.number().required().label("Latitude"),
    longitude: Joi.number().required().label("Latitude"),
    propertyCity: Joi.string().regex(/^[A-Za-z]+$/).max(20).required().label("City"),
    propertyPincode: Joi.string().length(6).regex(/^\d+$/).required().label("Pincode"),
  };

  validate = () => {

    const {error} = Joi.validate(this.state.property,  this.schema, {abortEarly : false});
    if(!error) return null;

    const errors = {};

    for (let item of error.details){
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  validateProperty = (input) =>{
    const obj = {[input.name] : input.value}
    const schema = {[input.name] : this.schema[input.name]}
    const {error} = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  }

  receiveCoord = (coord) => {
    console.log(coord, "coord");
    const { lat, lng } = coord;
    const property = {...this.state.property};
    property["latitude"] = lat;
    property["longitude"] = lng;
    this.setState({ property });
  };

  registerProperty = (e) => {

    e.preventDefault();
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors : errors || {}});
    if (errors) return;

    const {
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
    } = this.state.property;

    const {id} = this.props.user;
    const {propertyRegistDate} = this.state;
    Axios.post(
      `http://localhost:8080/realEstate/owner/newProperty/${id}`,
      {
        propertyTitle: propertyTitle,
        propertyArea: Math.ceil(dimensionBreadth * dimensionLength),
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
      console.log(res.data);
      this.props.history.push("/ownerDash");
    });
  };

  handleChange = (e) => {
    const errors = {...this.state.errors};
    const errorMessages = this.validateProperty(e.currentTarget);
    if(errorMessages) errors[e.currentTarget.name] = errorMessages;
    else delete errors[e.currentTarget.name]

    const property = { ...this.state.property };
    property[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ property, errors });
  }

  render() {
    const { dimensionLength, dimensionBreadth } = this.state.property;
    const Area = Math.ceil(dimensionLength * dimensionBreadth);
    const {errors} = this.state;
    return (
      <>
        <div>
          <div className="row">
            <div className="col-7">
              <div className="container">
                <form className="container">
                  <h4>Land Property Registeration Form</h4>
                  <div className="form-group">
                    <label>Property Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="propertyTitle"
                      placeholder="Title"
                      onChange = {this.handleChange}
                    />
                    {errors.propertyTitle && <div className="alert alert-danger">{errors.propertyTitle}</div>}
                  </div>

                  <div className="form-group">
                    <label>Length (ft)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Length"
                      name="dimensionLength"
                      onChange={this.handleChange}
                    />
                    {errors.dimensionLength && <div className="alert alert-danger">{errors.dimensionLength}</div>}
                  </div>

                  <div className="form-group">
                    <label>Breadth (ft)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Breadth"
                      name="dimensionBreadth"
                      onChange={this.handleChange}
                    />
                    {errors.dimensionBreadth && <div className="alert alert-danger">{errors.dimensionBreadth}</div>}
                  </div>
                  <div className="form-group">
                    <label>Property Area (sqft)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="propertyArea"
                      placeholder={Area}
                      disabled
                    />
                    {}
                  </div>
                  <div className="form-group">
                    <label>Property Price</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Price"
                      name="propertyPrice"
                      onChange={this.handleChange}
                    />
                    {errors.propertyPrice && <div className="alert alert-danger">{errors.propertyPrice}</div>}
                  </div>
                  <div className="form-group">
                    <label>Property Type</label>
                    <select
                      className="form-control"
                      name="propertyType"
                      onChange={this.handleChange}
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
                      name="ownershipType"
                      onChange={this.handleChange}
                    >
                      <option value="FREEHOLD">FREEHOLD</option>
                      <option value="LEASEHOLD">LEASEHOLD</option>
                      <option value="POWEROFATTORNEY">POWER OF ATTORNEY</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Latitude</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={this.state.property.latitude}
                      disabled
                      name="latitude"
                    />
                  </div>
                  <div className="form-group">
                    <label>Longitude</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={this.state.property.longitude}
                      disabled
                      name="longitude"
                    />
                  </div>
                  <div className="form-group">
                    <label>Property City</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      name="propertyCity"
                      onChange={this.handleChange}
                    />
                    {errors.propertyCity && <div className="alert alert-danger">{errors.propertyCity}</div>}
                  </div>
                  <div className="form-group">
                    <label>Property Pincode</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Pincode"
                      name="propertyPincode"
                      onChange={this.handleChange}
                    />
                    {errors.propertyPincode && <div className="alert alert-danger">{errors.propertyPincode}</div>}
                  </div>
                </form>
              </div>
              <div className="row">
                <div className="col text-center">
                  <button
                    disabled = {this.validate()}
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
              <Map getCoord={this.receiveCoord} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PropertyReg;
