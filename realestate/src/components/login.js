import React from "react";
import regAcc from "./registrationChoice";
import Axios from "axios";
import Joi from 'joi-browser';

class mainLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user : {email: "", password: ""},
      errors : {},
      isLogin: false
    };
  }

  schema = {
    email : Joi.string().required().label("Email"),
    password : Joi.string().required().label("Password")
  }

  validate = () => {
    const {error} = Joi.validate(this.state.user, this.schema, {abortEarly : false});
    if(!error) return null;

    const errors = {};
    for(let item of error.details) {
      errors[item.path[0]]= item.message;
    }

    return errors;
  }

  validateProperty = (input) => {
    const obj = {[input.name] : input.value}
    const schema = {[input.name] : this.schema[input.name]}
    const {error} = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  }

  handleSumbit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors : errors || {}});
    if(errors) return;

    console.log("submitted");
    const { email, password } = this.state.user;
    switch (this.props.ownerType) {
      case "Owner":
        console.log("inOwnerLogin", email, password);
        Axios.post("http://localhost:8080/realEstate/owner/login", {
          email: email,
          password: password,
        })
          .then((response) => {
            const {
              ownerId,
              ownerName,
              ownerEmail,
              ownerPassword,
              ownerPhoneNo,
              ownerIdProof,
              ownerCity,
              ownerPincode,
              ownerRegistDate,
              landProperties,
            } = response.data;
            const user = {
              id: ownerId,
              name: ownerName,
              email: ownerEmail,
              password: ownerPassword,
              phoneNo: ownerPhoneNo,
              idProof: ownerIdProof,
              city: ownerCity,
              pinCode: ownerPincode,
              regDate: ownerRegistDate,
            };
            this.props.sendData(user);
            localStorage.setItem("actorId", response.data.ownerId);
            localStorage.setItem("actorType", "Owner");
            this.props.history.replace("/ownerDash");
          })
          .catch((err) => {
            this.setState({ isLogin: true });
          });

        break;
      case "Buyer":
        console.log("inBuyerLogin", email, password);
        Axios.post("http://localhost:8080/realEstate/buyer/login", {
          email: email,
          password: password,
        })
          .then((response) => {
            const {
              buyerId,
              buyerName,
              buyerEmail,
              buyerPassword,
              buyerPhoneNo,
              buyerCity,
              buyerPincode,
              buyerRegistDate,
            } = response.data;

            const user = {
              id: buyerId,
              name: buyerName,
              email: buyerEmail,
              password: buyerPassword,
              phoneNo: buyerPhoneNo,
              city: buyerCity,
              pinCode: buyerPincode,
              regDate: buyerRegistDate,
            };
            this.props.sendData(user);
            localStorage.setItem("actorId", response.data.buyerId);
            localStorage.setItem("actorType", "Buyer");
            this.props.history.replace("/buyerDash");
          })
          .catch((err) => {
            this.setState({ isLogin: true });
          });
        break;

      case "Admin":
        Axios.post("http://localhost:8080/realEstate/admin/login", {
          email: email,
          password: password,
        })
          .then((response) => {
            const { adminId, adminEmail, adminName } = response.data;
            const user = { id: adminId, name: adminName, email: adminEmail };
            this.props.sendData(user);
            localStorage.setItem("actorId", response.data.adminId);
            localStorage.setItem("actorType", "Admin");
            this.props.history.replace("/adminDash");
          })
          .catch((err) => {
            this.setState({ isLogin: true });
          });

        break;

      default:
        break;
    }
  }

  handleChange = (e) => {
    const errors = {...this.state.errors};
    const errorMessages = this.validateProperty(e.currentTarget);
    if(errorMessages) errors[e.currentTarget.name] = errorMessages;
    else delete errors[e.currentTarget.name]

    const user = {...this.state.user};
    user[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ user, errors});
  }

  render() {
    const {errors} = this.state;
    return (
      <div>
        <div id="cover-caption">
          <div className="container">
            <div className="row">
              <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                <h1 className="display-4 py-2 text-truncate">
                  {this.props.ownerType} Login
                </h1>
                <div className="px-2">
                  <form action="" className="justify-content-center">
                    <div className="form-group">
                      <label className="sr-only">Email</label>
                      <input
                        autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        onChange={this.handleChange}
                      />
                      {errors.email && <div className="alert alert-danger">{errors.email}</div>}
                    </div>
                    <div className="form-group">
                      <label className="sr-only">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={this.handleChange}
                      />
                      {errors.password && <div className="alert alert-danger">{errors.password}</div>}
                    </div>
                  </form>

                  <div className="row">
                    <div className="col text-center">
                      <div className="form-group m-0">
                        <button
                          disabled = {this.validate()}
                          type="submit"
                          className="btn btn-primary btn-block"
                          onClick={this.handleSumbit}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </div>

                  {this.state.isLogin && (
                    <div class="alert alert-danger">
                      Username or Password is invalid
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center ">
          <p>
            Don't have an account? <a href="/Register">Create One</a>
          </p>
        </div>
      </div>
    );
  }
}

export default mainLogin;
