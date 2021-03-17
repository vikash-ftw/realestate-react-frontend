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
  NavLink,
} from "react-router-dom";
import MainLogin from "./components/login";
import AdminDashboard from "./components/adminDashboard";
import OwnerDashboard from "./components/ownerDashboard";
import BuyerDashboard from './components/buyerDashboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      actorName: "",
      actorRole: "",
    };
  }

  handleLogin = (name, role) => {
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
        <nav className="navbar navbar-expand navbar-light bg-light">
          <div className="navbar-nav">
            <ul className="nav navbar-nav m-2">
              <li>
                <NavLink className="nav-link" to="/">
                  Horizon Real Estate
                </NavLink>
              </li>
            </ul>
          </div>

          {this.state.isLogin ? (
            <>
              <div className="navbar-nav">
                <ul className="nav navbar-nav m-2">
                  <li>
                    {" "}
                    <NavLink className="nav-link" to="/">
                      {this.state.actorName + "DashBoard"}
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="navbar-nav ml-auto">
                <ul className="nav navbar-nav m-2">
                  <li>
                    <NavLink
                      className="nav-link"
                      to={"/" + this.state.actorRole + "Dash"}
                    >
                      {"HI, " + String(this.state.actorName).toUpperCase()}
                      {console.log("/" + this.state.actorRole + "Dash")}
                    </NavLink>
                  </li>
                </ul>

                <ul className="nav navbar-nav m-2">
                  <li>
                    {" "}
                    <NavLink
                      className="nav-link"
                      exact
                      onClick={this.logout}
                      to="/Register"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="navbar-nav ml-auto">
              <ul className="nav navbar-nav m-2">
                <li>
                  <NavLink className="nav-link" to="/Login">
                    Login
                  </NavLink>
                </li>
              </ul>

              <ul className="nav navbar-nav m-2 ">
                <li>
                  <NavLink className="nav-link" exact to="/Register">
                    SignUp
                  </NavLink>
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
              <MainLogin ownerType="Admin" {...props} />
            )}
          />
          
          <Route
            path="/buyerDash"
            render={(props) => (
              <BuyerDashboard
                onLogin={this.handleLogin}
                actorId={localStorage.getItem("actorId")}
                name={localStorage.getItem("name")}
                actorType="buyer"
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
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
