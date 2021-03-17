import React from "react";
import Axios from "axios";

class ownerReg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  // "ownerName": "UpdateFule",
  // "ownerEmail": "email11",
  // "ownerPassword": "root",
  // "ownerPhoneNo": "55555555",
  // "ownerIdProof": "1222",
  // "ownerCity": "ajantha",
  // "ownerPincode": "123456",
  // "ownerRegistDate": null

  addOwner() {
    const {
      name,
      email,
      password,
      phone,
      IdProof,
      city,
      pinCode,
      regDate,
    } = this.state;
    Axios.post("http://localhost:8080/realEstate/owner", {
      ownerName: name,
      ownerEmail: email,
      ownerPassword: password,
      ownerPhoneNo: phone,
      ownerIdProof: IdProof,
      ownerCity: city,
      ownerPincode: pinCode,
      ownerRegistDate: regDate,
    }).then((response) => {
      console.log(response.data);
      this.props.history.replace("/ownerLogin");
    });
  }

  render() {
    return (
      <>
        <h2 className="text-center">Owner Registration</h2>
        <form className="col-lg-6 offset-lg-3 ">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              id="0InputEmail"
              aria-describedby="emailHelp"
              placeholder="FullName"
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
              placeholder="Email"
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="text"
              className="form-control"
              placeholder="Password"
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="PhoneNo"
              onChange={(e) => {
                this.setState({ phone: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <label>Govt. Id proof</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Id number"
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
              placeholder="City"
              onChange={(e) => {
                this.setState({ city: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <label>Pin code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Pin code"
              onChange={(e) => {
                this.setState({ pinCode: e.target.value });
              }}
            />
          </div>
        </form>
        <div className="row">
          <div className="col text-center">
            <button className="btn btn-primary" onClick={() => this.addOwner()}>
              Register
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default ownerReg;
