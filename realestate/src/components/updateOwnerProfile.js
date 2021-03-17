import React, { Component } from "react";
import App from "../App";
import Axios from "axios";
class OwnerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.user.id,
      name: this.props.user.name,
      email: this.props.user.email,
      password: this.props.user.password,
      phone: this.props.user.phoneNo,
      IdProof: this.props.user.idProof,
      city: this.props.user.city,
      pinCode: this.props.user.pinCode,
      regDate: new Date(),
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
      phone,
      IdProof,
      city,
      pinCode,
      regDate,
    } = this.state;
    Axios.put(`http://localhost:8080/realEstate/owner/update/${id}`, {
      ownerId: id,
      ownerName: name,
      ownerEmail: email,
      ownerPassword: password,
      ownerPhoneNo: phone,
      ownerIdProof: IdProof,
      ownerCity: city,
      ownerPincode: pinCode,
      ownerRegistDate: regDate,
    }).then((res) => {
      console.log(res.data);
    });
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
    } = this.props.user;
    return (
      <>
        <form className="col-lg-6 offset-lg-3 justify-content-center">
          <div className="form-group">
            <label>Owner ID</label>
            <input
              type="text"
              className="form-control"
              id="0InputEmail"
              aria-describedby="emailHelp"
              placeholder={id}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Owner Name</label>
            <input
              type="text"
              className="form-control"
              id="0InputEmail"
              aria-describedby="emailHelp"
              placeholder={name}
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              id="name"
              aria-describedby="name"
              placeholder={email}
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder={password}
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
            />
          </div>

          <div className="form-group">
            <label>PhoneNumber</label>
            <input
              type="text"
              className="form-control"
              placeholder={phoneNo}
              onChange={(e) => {
                this.setState({ phone: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <label>OwnerIdProof</label>
            <input
              type="text"
              className="form-control"
              placeholder={idProof}
              onChange={(e) => {
                this.setState({ IdProof: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              placeholder={city}
              onChange={(e) => {
                this.setState({ city: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <label>PinCode</label>
            <input
              type="text"
              className="form-control"
              placeholder={pinCode}
              onChange={(e) => {
                this.setState({ pinCode: e.target.value });
              }}
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
