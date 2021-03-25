import React, { Component } from "react";
import Axios from "axios";
import Joi from 'joi-browser';

class UpdateLandProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      property: {
        propertyTitle: "",
        propertyArea: 0,
        dimensionLength: "",
        dimensionBreadth: "",
        propertyPrice: "",
        propertyType: "",
        ownershipType: "",
        latitude: "",
        longitude: "",
        propertyCity: "",
        propertyPincode: "",
      },
      propertyId:"",
      propertyRegistDate:"",
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

  componentDidMount() {
    console.log("in update", this.props.landProperty);
    const propertyId = this.props.landProperty;
    Axios.get(
      `http://localhost:8080/realEstate/LandProperty/${propertyId}`
    ).then((res) => {
      console.log(res.data);
      const {
        propertyId,
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
      } = res.data;

      const property = {
        propertyTitle: propertyTitle,
        propertyArea: propertyArea,
        dimensionLength : dimensionLength,
        dimensionBreadth: dimensionBreadth,
        propertyPrice : propertyPrice,
        propertyType: propertyType,
        ownershipType : ownershipType,
        latitude : latitude,
        longitude : longitude,
        propertyCity : propertyCity,
        propertyPincode : propertyPincode,
      }
      
      this.setState({ property });
      this.setState({ propertyId });
      this.setState({ propertyRegistDate })
    });
  }

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


  handleInputChange = (e) => {
    const errors = {...this.state.errors};
    const errorMessages = this.validateProperty(e.currentTarget);
    if(errorMessages) errors[e.currentTarget.name] = errorMessages;
    else delete errors[e.currentTarget.name]

    const property = { ...this.state.property };
    property[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ property, errors});
  };

  updateLandProperty = (e) => {
    console.log(this.state, "in update button");

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

    const {propertyId} = this.state;
    const {propertyRegistDate} = this.state;
    
    Axios.put(
      `http://localhost:8080/realEstate/owner/updateProp/${this.props.user.id}/${propertyId}`,
      {
        propertyId: propertyId,
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
      console.log(res.data, "updated data");
      this.props.history.replace("/ownerDash");
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
    } = this.state.property;
    const {propertyId} = this.state;
    const Area = Math.ceil(dimensionBreadth * dimensionLength);
    const {errors} = this.state;
    return (
      <>
        <div class="container">
          <h2 className="text-center">Update Property</h2>
          <form className="col-lg-6 offset-lg-3 justify-content-center">
          <div className="form-group">
              <label>Property Id</label>
              <input
                type="text"
                className="form-control"
                name="propertyId"
                value={propertyId}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Property Title</label>
              <input
                type="text"
                className="form-control"
                name="propertyTitle"
                value={propertyTitle}
                onChange={this.handleInputChange}
              />
              {errors.propertyTitle && <div className="alert alert-danger">{errors.propertyTitle}</div>}
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
              {errors.dimensionLength && <div className="alert alert-danger">{errors.dimensionLength}</div>}
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
              {errors.dimensionBreadth && <div className="alert alert-danger">{errors.dimensionBreadth}</div>}
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
               {errors.propertyPrice && <div className="alert alert-danger">{errors.propertyPrice}</div>}
            </div>
            <div className="form-group">
              <label>Property Type</label>
              <select
                className="form-control"
                name = "propertyType"
                onChange={this.handleInputChange}
                value = {propertyType}
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
                name="ownershipType"
                onChange={this.handleInputChange}
                value = {ownershipType}
              >
                <option name="FREEHOLD" value="FREEHOLD">
                  FREEHOLD
                </option>
                <option name="LEASEHOLD" value="LEASEHOLD">
                  LEASEHOLD
                </option>
                <option name="POWEROFATTORNEY" value="POWEROFATTORNEY">
                  POWER OF ATTORNEY
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
              {errors.propertyCity && <div className="alert alert-danger">{errors.propertyCity}</div>}
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
              {errors.propertyPincode && <div className="alert alert-danger">{errors.propertyPincode}</div>}
            </div>
          </form>
          <div className="row">
            <div className="col text-center">
              <button
                disabled = {this.validate()}
                className="btn btn-primary"
                onClick={this.updateLandProperty}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UpdateLandProperty;
