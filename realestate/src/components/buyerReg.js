import React from "react";
import Axios from "axios";
import Joi from 'joi-browser';

class BuyerReg extends React.Component {
  state = {
    buyer: {
      name: "",
      email: "",
      password: "",
      phone: "",
      city: "",
      pinCode: "",
    },
    regDate: new Date(),
    isRegister : false,
    errors : {},
  };

  schema = {
    name : Joi.string().regex(/^[A-Za-z]+$/).max(50).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().max(15).required().label("Password"),
    phone: Joi.string().length(10).regex(/^\d+$/).required().label("PhoneNo"),
    city: Joi.string().regex(/^[A-Za-z]+$/).max(20).required().label("City"),
    pinCode: Joi.string().length(6).regex(/^\d+$/).required().label("Pincode"),
  }

  validate = () => {

    const {error} = Joi.validate(this.state.buyer,  this.schema, {abortEarly : false});
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

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors : errors || {}});
    if (errors) return;

    //no errors then
    const {
      name,
      email,
      password,
      phone,
      city,
      pinCode,
    } = this.state.buyer;

    const {regDate} = this.state;

    Axios.post("http://localhost:8080/realEstate/buyer", {
      buyerName: name,
      buyerEmail: email,
      buyerPassword: password,
      buyerPhoneNo: phone,
      buyerCity: city,
      buyerPincode: pinCode,
      buyerRegistDate: regDate,
    })
      .then((response) => {
        console.log(response.data);
        this.props.history.replace("/buyerLogin");
      })
      .catch((err) => {
        this.setState({ isRegister: true });
      });
  };

  handleChange = (e) => {

    const errors = {...this.state.errors};
    const errorMessages = this.validateProperty(e.currentTarget);
    if(errorMessages) errors[e.currentTarget.name] = errorMessages;
    else delete errors[e.currentTarget.name]

    const buyer = { ...this.state.buyer };
    buyer[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ buyer, errors });
  };


  render() {
    const {errors} = this.state;
    return (
      <>
        <h2 className="text-center">Buyer Registration Form</h2>
        {this.state.isRegister ? (
          <div className="">
            <div class="alert alert-danger text-center">
              Registration Failed
            </div>{" "}
          </div>
        ) : (
          <></>
        )}
        <form className="col-lg-6 offset-lg-3 ">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="FullName"
              name="name"
              onChange={this.handleChange}
            />
             {errors.name && <div className="alert alert-danger">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
            />
            {errors.email && <div className="alert alert-danger">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            />
            {errors.password && <div className="alert alert-danger">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="PhoneNo"
              name="phone"
              onChange={this.handleChange}
            />
            {errors.phone && <div className="alert alert-danger">{errors.phone}</div>}
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              placeholder="City"
              name="city"
              onChange={this.handleChange}
            />
            {errors.city && <div className="alert alert-danger">{errors.city}</div>}
          </div>
          <div className="form-group">
            <label>Pin code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Pin code"
              name="pinCode"
              onChange={this.handleChange}
            />
            {errors.pinCode && <div className="alert alert-danger">{errors.pinCode}</div>}
          </div>
        </form>
        <div className="row">
          <div className="col text-center">
          <div className="form-group m-0">
            <button
              disabled = {this.validate()}
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Register
            </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BuyerReg;
