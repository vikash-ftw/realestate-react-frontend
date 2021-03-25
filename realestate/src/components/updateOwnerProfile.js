import React, { Component } from "react";
import App from "../App";
import Axios from "axios";
import Joi from "joi-browser";
class OwnerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.user.id,
      owner: {
        name: this.props.user.name,
        email: this.props.user.email,
        password: this.props.user.password,
        phoneNo: this.props.user.phoneNo,
        idProof: this.props.user.idProof,
        city: this.props.user.city,
        pinCode: this.props.user.pinCode,
      },
      regDate: this.props.user.regDate,
      errors: {},
      isUpdate: false,
    };
  }

  // "ownerName": "UpdateFule",
  // "ownerEmail": "email11",
  // "ownerPassword": "root",
  // "ownerPhoneNo": "55555555",
  // "ownerIdProof": "1222",
  // "ownerCity": "ajantha",
  // "ownerPincode": "123456",
  // "ownerRegistDate": null
  schema = {
    name: Joi.string()
      .regex(/^[A-Za-z]+$/)
      .max(20)
      .required()
      .label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().max(15).required().label("Password"),
    phoneNo: Joi.string().length(10).regex(/^\d+$/).required().label("PhoneNo"),

    idProof: Joi.number().required().label("IdProof"),
    city: Joi.string().max(15).required().label("City"),
    pinCode: Joi.string().length(6).regex(/^\d+$/).required().label("PinCode"),
  };
  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.owner, this.schema, options);

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  updateOwner = () => {
    const errors = this.validate();
    const id = this.props.user.id;
    this.setState({ errors: errors || {} });
    if (errors) return;
    const {
      name,
      email,
      password,
      phoneNo,
      idProof,
      city,
      pinCode,
    } = this.state.owner;
    Axios.put(`http://localhost:8080/realEstate/owner/update/${id}`, {
      ownerId: id,
      ownerName: name,
      ownerEmail: email,
      ownerPassword: password,
      ownerPhoneNo: phoneNo,
      ownerIdProof: idProof,
      ownerCity: city,
      ownerPincode: pinCode,
      ownerRegistDate: this.state.regDate,
    })
      .then((res) => {
        this.props.onLogout();
        console.log(res.data);
        this.props.history.replace("/ownerLogin");
      })
      .catch((error) => {
        this.setState({ isUpdate: true });
      });
  };

  validateProperty = (input) => {
    const obj = { [input.name]: input.value };
    const schema = { [input.name]: this.schema[input.name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleInputChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const owner = { ...this.state.owner };
    owner[input.name] = input.value;
    this.setState({ owner, errors });
  };
  render() {
    const {
      name,
      email,
      password,
      phoneNo,
      idProof,
      city,
      pinCode,
      regDate,
    } = this.state.owner;
    return (
      <>
        <h2 className="text-center">Owner Updation Page</h2>{" "}
        {this.state.isUpdate && (
          <div class="alert alert-danger text-center">
            Updatetion  Because of Uniqe Email , IdProof, and Number
          </div>
        )}
        <form className="col-lg-6 offset-lg-3 justify-content-center">
          <div className="form-group">
            <label>Owner ID</label>
            <input
              type="text"
              className="form-control"
              name="id"
              value={this.state.id}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Owner Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={this.handleInputChange}
            />
            {this.state.errors.name && (
              <div className="alert alert-danger">{this.state.errors.name}</div>
            )}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={this.handleInputChange}
            />
            {this.state.errors.email && (
              <div className="alert alert-danger">
                {this.state.errors.email}
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={this.handleInputChange}
            />
            {this.state.errors.password && (
              <div className="alert alert-danger">
                {this.state.errors.password}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>PhoneNumber</label>
            <input
              type="text"
              className="form-control"
              name="phoneNo"
              value={phoneNo}
              onChange={this.handleInputChange}
            />
            {this.state.errors.phoneNo && (
              <div className="alert alert-danger">
                {this.state.errors.phoneNo}
              </div>
            )}
          </div>
          <div className="form-group">
            <label>OwnerIdProof</label>
            <input
              type="text"
              className="form-control"
              name="idProof"
              value={idProof}
              onChange={this.handleInputChange}
            />
            {this.state.errors.idProof && (
              <div className="alert alert-danger">
                {this.state.errors.idProof}
              </div>
            )}
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={city}
              onChange={this.handleInputChange}
            />
            {this.state.errors.city && (
              <div className="alert alert-danger">{this.state.errors.city}</div>
            )}
          </div>
          <div className="form-group">
            <label>PinCode</label>
            <input
              type="text"
              className="form-control"
              name="pinCode"
              value={pinCode}
              onChange={this.handleInputChange}
            />
            {this.state.errors.pinCode && (
              <div className="alert alert-danger">
                {this.state.errors.pinCode}
              </div>
            )}
          </div>
        </form>
        <div className="row">
          <div className="col text-center">
            <button
              className="btn btn-primary"
              disabled={this.validate()}
              onClick={this.updateOwner}
            >
              Update 
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default OwnerProfile;
