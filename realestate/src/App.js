import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginChoice from "./components/loginChoice";
import RegisterChoice from "./components/registrationChoice";
import OwnerProfile from "./components/ownerProfilePage";
import BuyerProfile from "./components/buyerProfilePage";
import Home from "./components/home";
import OwnerReg from "./components/ownerReg";
import BuyerReg from "./components/buyerReg";
import AdminReg from "./components/adminReg";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import MainLogin from "./components/login";
import AdminDashboard from "./components/adminDashboard";
import OwnerDashboard from "./components/ownerDashboard";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      actorName: "",
      actorRole: "",
    };
  }

  handleLogin = (name , role) => {
    this.setState({ isLogin: true });
    this.setState({ actorName: name });
    this.setState({ actorRole: role });
    console.log(this.state.actorRole);
  };
  logout = () => {
    this.setState({ isLogin: false });
    this.setState({ actorName: "" });
    //this.props.history.push("/");
  };

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav">
            <ul className="nav navbar-nav m-2">
              <li>
                {" "}
                <Link to="/">Home</Link>
              </li>
            </ul>
          </div>

          {this.state.isLogin ? (
            <>
              <div className="navbar-nav">
                <ul className="nav navbar-nav m-2">
                  <li>
                    {" "}
                    <Link to="/">{ this.state.actorName+"DashBoard"}</Link>
                  </li>
                </ul>
              </div>
              <div className="navbar-nav ml-auto">
                <ul className="nav navbar-nav m-2">
                  <li>
                    <Link
                      className="active"
                      to={"/" + this.state.actorRole + "Dash"}
                    >
                      {this.state.actorName}
                      {console.log("/" + this.state.actorRole + "Dash")}
                    </Link>
                  </li>
                </ul>

                <ul className="nav navbar-nav m-2">
                  <li>
                    {" "}
                    <Link
                      className="active"
                      exact
                      onClick={this.logout}
                      to="/Register"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="navbar-nav ml-auto">
              <ul className="nav navbar-nav m-2">
                <li>
                  {" "}
                  <Link to="/Login">Login</Link>
                </li>
              </ul>

              <ul className="nav navbar-nav m-2 ">
                <li>
                  {" "}
                  <Link className="active" exact to="/Register">
                    SignUp
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Login" component={LoginChoice} />
          <Route path="/Login" component={OwnerProfile} />
          <Route path="/Register" component={RegisterChoice} />
          <Route path="/ownerReg" component={OwnerReg} />
          <Route path="/buyerReg" component={BuyerReg} />
          <Route path="/adminReg" component={AdminReg} />
          <Route path="/mainLogin" component={MainLogin} />
          <Route
            path="/ownerLogin"
            render={(props) => <MainLogin ownerType="Owner" {...props} />}
          />
          <Route
            path="/buyerLogin"
            render={(props) => <MainLogin ownerType="Buyer" {...props} />}
          />
          <Route
            path="/adminLogin"
            render={(props) => (
              <MainLogin ownerType="Admin" isLogin={true} {...props} />
            )}
          />
          <Route
            path="/adminDash"
            render={(props) => (
              <AdminDashboard
                onLogin={this.handleLogin}
                actorId={localStorage.getItem("actorId")}
                name={localStorage.getItem("name")}
                actorType="admin"
                {...props}
              />
            )}
          />
          <Route
            path="/ownerDash"
            render={(props) => (
              <OwnerDashboard
                onLogin={this.handleLogin}
                actorId={localStorage.getItem("actorId")}
                name={localStorage.getItem("name")}
                actorType="owner"
                {...props}
              />
            )}
          />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
