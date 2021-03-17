import React from "react";
import Axios from "axios";

class adminReg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      regDate: new Date(),
    };
  }

  // "adminName" : "mangesh",
  // "adminEmail" : "manegsh@gmail.com",
  // "adminPassword" : "root",
  // "adminRegistDate" : "2021-03-10"
  addAdmin() {
    const { name, email, password, regDate } = this.state;
    Axios.post("http://localhost:8080/realEstate/admin", {
      adminName: name,
      adminEmail: email,
      adminPassword: password,
      adminRegistDate: regDate,
    }).then((response) => {
      console.log(response.data);
      this.props.history.replace("/adminLogin");
    });
    //this.props.history.replace("/adminLogin");
  }

  render() {
    return (
      <>
        <h2 className="text-center">Admin Registration</h2>
        <form className="col-lg-6 offset-lg-3 ">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
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
        </form>
        <div className="row">
          <div className="col text-center">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => this.addAdmin()}
            >
              Register
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default adminReg;
