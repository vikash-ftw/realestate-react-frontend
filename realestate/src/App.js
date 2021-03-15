import './App.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './components/login';
import Register from './components/registration';
import OwnerProfile from './components/ownerProfile';
import BuyerProfile from './components/buyerProfile';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom";


class App extends React.Component{
  
  state = {
    isOwnerLogin : false,
    isBuyerLogin : false
  }
  render() {
    return (

      <div className='container'>    
              <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav">
                  <ul className="nav navbar-nav m-2">
                    <li> <Link activeClassName="active" to='/'>Home</Link></li>
                  </ul>        
                </div>
              

                {this.state.isBuyerLogin ? (
                    <div className="navbar-nav ml-auto">
                      <ul className="nav navbar-nav">
                        <li> <Link activeClassName="active" to='/Login'>BuyerProfile</Link></li>
                      </ul>
                        
                      <ul className="nav navbar-nav">
                        <li> <Link activeClassName="active" exact to='/Register'>Logout</Link></li>
                      </ul>
                    </div>
          ) : (
              <div className="navbar-nav ml-auto">
                <ul className="nav navbar-nav">
                  <li> <Link activeClassName="active" to='/Login'>Login</Link></li>
                </ul>
                        
                <ul className="nav navbar-nav ">
                  <li> <Link activeClassName="active" exact to='/Register'>SignUp</Link></li>
                </ul>
              </div>
            

                        
                )}
                
              </nav>
        
              <Switch>
                <Route exact path='/Login' component={Login}/>
                <Route exact path='/Login'/>
                <Route exact path='/Login' component={OwnerProfile}/>
                <Route exact path='/Register' component={Register}/>
        </Switch>
        <div className="jumbotron text-center">
                <h1>Horizon Real EState</h1>
        </div>
        <ul class="carousel-indicators">
          <li class="item1 active"></li>
        </ul>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="C:/Users/LENOVO/Downloads/738065.jpg" alt="Los Angeles" width="1100" height="500"/>
          </div>
        </div>
      </div>
      
      
    )
  }
}

export default App;
