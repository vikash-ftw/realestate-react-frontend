import React from "react";
import Axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "ram00@gmail.com",
      password: "ram1234",
      users: [],
      isLogin: false,
      isOwner: false,
      isBuyer: false,
      isAdmin: true,
      userRole: "",
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

  render() {
    return (
      <>
        <div className="justify-content-center">
          <button onClick={() => this.loginProcess()}>Owner</button>
          <button
            onClick={(e) => {
              this.setState({ userRole: "Buyer", isBuyer: true });
              localStorage.setItem("userRole", this.state.userRole);
              console.log(this.state.userRole);
            }}
          >
            Buyer
          </button>
          <button
            onClick={(e) => {
              this.setState({ userRole: "Admin", isAdmin: true });
              localStorage.setItem("userRole", this.state.userRole);
              console.log(this.state.userRole);
            }}
          >
            Admin
          </button>
        </div>
        {}
      </>
    );
  }
}

export default Login;
