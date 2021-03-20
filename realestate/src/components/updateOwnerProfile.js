import React, { Component } from "react";
import App from "../App";
import Axios from "axios";
class OwnerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: {
        id: this.props.user.id,
        name: this.props.user.name,
        email: this.props.user.email,
        password: this.props.user.password,
        phoneNo: this.props.user.phoneNo,
        idProof: this.props.user.idProof,
        city: this.props.user.city,
        pinCode: this.props.user.pinCode,
        regDate: this.props.user.regDate,
      },
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
  updateOwner = () => {
    const {
      id,
      name,
      email,
      password,
      phoneNo,
      idProof,
      city,
      pinCode,
      regDate,
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
      ownerRegistDate: regDate,
    }).then((res) => {
      this.props.onLogout();
      console.log(res.data);
      this.props.history.push("/ownerLogin");
    });
  };
  handleInputChange = (e) => {
    const owner = { ...this.state.owner };
    owner[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ owner });
  };
  render() {
    const {
      id,
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
        <h2 className="text-center">Owner Updation Page</h2>
        <form className="col-lg-6 offset-lg-3 justify-content-center">
          <div className="form-group">
            <label>Owner ID</label>
            <input
              type="text"
              className="form-control"
              name="id"
              value={id}
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
          </div>
        </form>
        <div className="row">
          <div className="col text-center">
            <button className="btn btn-primary" onClick={this.updateOwner}>
              Update
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default OwnerProfile;
