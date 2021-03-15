import './App.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './components/login';
import Register from './components/registration';
import OwnerProfile from './components/ownerProfile';
import BuyerProfile from './components/buyerProfile';
import Home from './components/home'


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
                <ul className="nav navbar-nav m-2">
                  <li> <Link activeClassName="active" to='/Login'>Login</Link></li>
                </ul>
                        
                <ul className="nav navbar-nav m-2 ">
                  <li> <Link activeClassName="active" exact to='/Register'>SignUp</Link></li>
                </ul>
              </div>      
            )}
                
          </nav>
        
        <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/Login'component={Login}/>
                <Route exact path='/Login' component={OwnerProfile}/>
                <Route exact path='/Register' component={Register}/>
        </Switch>
        
        
      </div>
      
      
    )
  }
}

export default App;
