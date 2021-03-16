import './App.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './components/login';
import Register from './components/registration';
import OwnerProfile from './components/ownerProfile';
import BuyerProfile from './components/buyerProfile';
import Home from './components/home';
import OwnerReg from './components/ownerReg'
import BuyerReg from './components/buyerReg';
import AdminReg from "./components/adminReg";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import MainLogin from './components/mainLogin';


class App extends React.Component{
  
  state = {
    isOwnerLogin : false,
    isBuyerLogin : false
  }

  
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

          {this.state.isBuyerLogin ? (
            <div className="navbar-nav ml-auto">
              <ul className="nav navbar-nav">
                <li>
                  {" "}
                  <Link className="active" to="/Login">
                    BuyerProfile
                  </Link>
                </li>
              </ul>

              <ul className="nav navbar-nav">
                <li>
                  {" "}
                  <Link className="active" exact to="/Register">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
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
          <Route path="/Login" component={Login} />
          <Route path="/Login" component={OwnerProfile} />
          <Route path="/Register" component={Register} />
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
            render={(props) => <MainLogin ownerType="Admin" {...props} />}
          />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
