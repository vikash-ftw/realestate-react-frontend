import React from "react";
import regAcc from "./registrationChoice";
import Axios from "axios";

class mainLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
    loginProcess() {
      const { email, password } = this.state;
    switch (this.props.ownerType) {
      case "Owner":
        console.log("inOwnerLogin", email, password);
        Axios.post("http://localhost:8080/realEstate/owner/login", {
          email: email,
          password: password,
        }).then((response) => {
          console.log(response.data);
          localStorage.setItem("actorId", response.data.ownerId);
          localStorage.setItem("name", response.data.ownerName);
          this.props.history.replace("/ownerDash");
        });

        break;
        case "Buyer":
            
            console.log("inBuyerLogin",email, password);
            Axios.post("http://localhost:8080/realEstate/buyer/login", {
              email: email,
              password: password,
            }).then((response) => {
              console.log(response.data);
            });
        break;
        case "Admin":
            console.log("inAdminLogin", email, password);
            Axios.post("http://localhost:8080/realEstate/admin/login", {
              email: email,
              password: password,
            }).then((response) => {
              const id = response.data.adminId;
              localStorage.setItem('actorId', response.data.adminId);
              localStorage.setItem("name", response.data.adminName);
              console.log(response.data , id);

              this.props.history.replace("/adminDash");
            });
            
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <>
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
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        onChange={(e) => {
                          this.setState({ email: e.target.value });
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="sr-only">Password</label>
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
                      <div className="form-group m-0">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          onClick={() => this.loginProcess()}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center ">
          <p>
            Don't have an account? <a href="#">Create One</a>
          </p>
        </div>
      </>
    );
  }
}

export default mainLogin;
