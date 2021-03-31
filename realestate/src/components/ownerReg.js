import React from "react";
import Axios from "axios";
import Register from "./registrationChoice";
import Joi from "joi-browser";

class ownerReg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: {
        name: "",
        email: "",
        password: "",
        phone: "",
        IdProof: "",
        city: "",
        pinCode: "",
      },
      regDate: new Date(),
      isRegister: false,
      errors: {},
    };
  }
  schema = {
    name: Joi.string()
      .regex(/^[A-Za-z ]+$/)
      .max(50)
      .required()
      .label("Name"),

    email: Joi.string().email().required().label("Email"),
    password: Joi.string().max(15).required().label("Password"),
    phone: Joi.string()
      .length(10)
      .regex(/^\d+$/)
      .required()
      .label("Phone Number"),
    IdProof: Joi.number().required().label("IdProof"),
    city: Joi.string()
      .regex(/^[A-Za-z]+$/)
      .max(20)
      .required()
      .label("City"),

    pinCode: Joi.string().length(6).regex(/^\d+$/).required().label("PinCode"),
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.owner, this.schema, options);
    console.log(result);

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  addOwner() {
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    const {
      name,
      email,
      password,
      phone,
      IdProof,
      city,
      pinCode,
    } = this.state.owner;
    Axios.post("http://localhost:8080/realEstate/owner", {
      ownerName: name,
      ownerEmail: email,
      ownerPassword: password,
      ownerPhoneNo: phone,
      ownerIdProof: IdProof,
      ownerCity: city,
      ownerPincode: pinCode,
      ownerRegistDate: this.state.regDate,
    })
      .then((response) => {
        console.log(response.data);
        this.props.history.replace("/Login");
      })
      .catch((err) => {
        this.setState({ isRegister: true });
      });
  }
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
      phone,
      IdProof,
      city,
      pinCode,
      regDate,
    } = this.state.owner;
    const { errors } = this.state.errors;
    return (
      <>
        <h2 className="text-center">Owner Registration Form</h2>
        {this.state.isRegister && (
          <div class="alert alert-danger text-center">
            Not Registered Because of Uniqe Email , IdProof, and Number
          </div>
        )}
        <form className="col-lg-6 offset-lg-3 ">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="FullName"
              name="name"
              onChange={this.handleInputChange}
              // error={errors.name}
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
              placeholder="Email"
              name="email"
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
              placeholder="Password"
              name="password"
              onChange={this.handleInputChange}
            />
            {this.state.errors.password && (
              <div className="alert alert-danger">
                {this.state.errors.password}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="PhoneNo"
              name="phone"
              onChange={this.handleInputChange}
            />
            {this.state.errors.phone && (
              <div className="alert alert-danger">
                {this.state.errors.phone}
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Govt. Id proof</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Id number"
              name="IdProof"
              onChange={this.handleInputChange}
            />
            {this.state.errors.IdProof && (
              <div className="alert alert-danger">
                {this.state.errors.IdProof}
              </div>
            )}
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              placeholder="City"
              name="city"
              onChange={this.handleInputChange}
            />
            {this.state.errors.city && (
              <div className="alert alert-danger">{this.state.errors.city}</div>
            )}
          </div>
          <div className="form-group">
            <label>Pin code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Pin code"
              name="pinCode"
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
              onClick={() => this.addOwner()}
            >
              Register
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default ownerReg;
