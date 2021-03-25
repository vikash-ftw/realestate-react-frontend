import React, { Component } from "react";
import Axios from "axios";
import Joi from 'joi-browser';

class BuyerUpdateProfile extends Component {
  state = {
    buyer: {
      name: this.props.user.name,
      email: this.props.user.email,
      password: this.props.user.password,
      phoneNo: this.props.user.phoneNo,
      city: this.props.user.city,
      pinCode: this.props.user.pinCode,
    },
    id: this.props.user.id,
    regDate: new Date(),
    errors: {},
    isUpdate : false,
  };

  schema = {
    name: Joi.string()
      .regex(/^[A-Za-z]+$/)
      .max(50)
      .required()
      .label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().max(15).required().label("Password"),
    phoneNo: Joi.string().length(10).regex(/^\d+$/).required().label("PhoneNo"),
    city: Joi.string()
      .regex(/^[A-Za-z]+$/)
      .max(20)
      .required()
      .label("City"),
    pinCode: Joi.string().length(6).regex(/^\d+$/).required().label("Pincode"),
  };

  validate = () => {
    const { error } = Joi.validate(this.state.buyer, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;

    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  validateProperty = (input) => {
    const obj = { [input.name]: input.value };
    const schema = { [input.name]: this.schema[input.name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;

    //no errors then
    const { name, email, password, phoneNo, city, pinCode } = this.state.buyer;

    const { id } = this.state;
    const { regDate } = this.state;

    Axios.put(`http://localhost:8080/realEstate/buyer/update/${id}`, {
      buyerId: id,
      buyerName: name,
      buyerEmail: email,
      buyerPassword: password,
      buyerPhoneNo: phoneNo,
      buyerCity: city,
      buyerPincode: pinCode,
      buyerRegistDate: regDate,
    }).then((res) => {
      console.log(res.data);
      this.props.onLogout();
      this.props.history.replace("/buyerLogin");
    }).catch((err) => {
        this.setState({isUpdate: true});
    });
  };

  handleInputChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessages = this.validateProperty(e.currentTarget);
    if (errorMessages) errors[e.currentTarget.name] = errorMessages;
    else delete errors[e.currentTarget.name];

    const buyer = { ...this.state.buyer };
    buyer[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ buyer, errors });
  };

  render() {
    const { name, email, password, phoneNo, city, pinCode } = this.state.buyer;
    const { id } = this.state;
    const {errors} = this.state;
    return (
      <div>
        <h2 className="text-center">Buyer Updation Page</h2>
        {this.state.isUpdate ? (
          <div className="">
            <div class="alert alert-danger text-center">
              Updation failed
            </div>{" "}
          </div>
        ) : (
          <></>
        )}
        <form className="col-lg-6 offset-lg-3 ">
          <div className="form-group">
            <label>Buyer ID</label>
            <input
              type="text"
              className="form-control"
              name="id"
              value={id}
              onChange={this.handleInputChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={this.handleInputChange}
            />
            {errors.name && (
              <div className="alert alert-danger">{errors.name}</div>
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
            {errors.email && (
              <div className="alert alert-danger">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="text"
              className="form-control"
              name="password"
              value={password}
              onChange={this.handleInputChange}
            />
            {errors.password && (
              <div className="alert alert-danger">{errors.password}</div>
            )}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              className="form-control"
              name="phoneNo"
              value={phoneNo}
              onChange={this.handleInputChange}
            />
            {errors.phoneNo && (
              <div className="alert alert-danger">{errors.phoneNo}</div>
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
            {errors.city && (
              <div className="alert alert-danger">{errors.city}</div>
            )}
          </div>
          <div className="form-group">
            <label>Pin code</label>
            <input
              type="text"
              className="form-control"
              name="pinCode"
              value={pinCode}
              onChange={this.handleInputChange}
            />
            {errors.pinCode && (
              <div className="alert alert-danger">{errors.pinCode}</div>
            )}
          </div>
        </form>
        <div className="row">
          <div className="col text-center">
            <button
              disabled={this.validate()}
              className="btn btn-primary"
              onClick={this.handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default BuyerUpdateProfile;
