import React from "react";
import Axios from "axios";

class BuyerReg extends React.Component {
  state = {
    buyer: {
      name: "",
      email: "",
      password: "",
      phone: "",
      city: "",
      pinCode: "",
      regDate: new Date(),
      isRegister : false
    },
  };

  addBuyer() {
    const {
      name,
      email,
      password,
      phone,
      city,
      pinCode,
      regDate,
    } = this.state.buyer;

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
  }
  

  handleInputChange = (e) => {
    const buyer = { ...this.state.buyer };
    buyer[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ buyer });
  };

  render() {

    return (
      <>
        <h2 className="text-center">Buyer Registration Form</h2>
        {this.state.isRegister ? (
          <div className="">
            <div class="alert alert-danger text-center">
              Not Registered Because of Uniqe Email , IdProof, and Number
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
              onChange={this.handleInputChange}
            />
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
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="text"
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={this.handleInputChange}
            />
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
          </div>
        </form>
        <div className="row">
          <div className="col text-center">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => this.addBuyer()}
            >
              Register
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default BuyerReg;
