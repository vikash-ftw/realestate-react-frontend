import React, { Component } from "react";
import App from "./../App";
import Axios from "axios";
class OwnerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      email: "",
      password: "",
      phone: "",
      IdProof: "",
      city: "",
      pinCode: "",
      regDate: new Date(),
    };
  }

  componentDidMount() {
    this.state.id = localStorage.getItem("actorId");
    Axios.get(`http://localhost:8080/realEstate/owner/${this.state.id}`).then(
      (res) => {
        const {
          ownerName,
          ownerEmail,
          ownerPassword,
          ownerPhoneNo,
          ownerIdProof,
          ownerCity,
          ownerPincode,
          ownerRegistDate,
        } = res.data;
        this.setState({
          name: ownerName,
          email: ownerEmail,
          password: ownerPassword,
          phone: ownerPhoneNo,
          IdProof: ownerIdProof,
          city: ownerCity,
          pinCode: ownerPincode,
          regDate: ownerRegistDate,
        });
      }
    );
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
    Axios.put(
      `http://localhost:8080/realEstate/owner/update/${this.state.id}`,
      {
        ownerId: id,
        ownerName: name,
        ownerEmail: email,
        ownerPassword: password,
          ownerPhoneNo: phone,
          ownerIdProof: IdProof,
          ownerCity: city,
          ownerPincode: pinCode,
        ownerRegistDate : regDate
      }
    ).then((res) => {
        console.log(res.data);
    })
  };
  render() {
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
              placeholder={phone}
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
              placeholder={IdProof}
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
