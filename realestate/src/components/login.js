import React from "react";
import Axios from "axios";
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "ram00@gmail.com",
      password: "ram1234",
      users: [],
      userRole: "NA",
    };
  }

  loginProcess() {
    console.log(this.state.email, this.state.password);
    const { email, password } = this.state;
    Axios.post("http://localhost:8080/realEstate/owner/login", {
      email: email,
      password: password,
    }).then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log(response.data);
      console.log("onlogin");
    });
  }

  isOwner() {
    this.setState({ userRole: 'owner' });
    console.log(this.state.userRole);
    localStorage.setItem("Role", this.state.userRole);
    this.props.history.push("./mainLogin");
    
  }

  render() {
    return (
      <>
        <div className="row">
          <br></br>
        </div>
        <div>
          <div className="row">
            <div className="col text-center">
              <Link to="/ownerLogin">OwnerLogin</Link>
            </div>
          </div>
          <div className="row">
            <br></br>
          </div>

          <div className="row">
            <div className="col text-center">
              <Link to="/BuyerLogin">BuyerLogin</Link>
            </div>
          </div>
          <div className="row">
            <br></br>
          </div>
          <div className="row">
            <div className="col text-center">
              <Link to='/adminLogin'>AdminLogin</Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
