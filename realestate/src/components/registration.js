import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom";
import ownerReg from './ownerReg';

class Register extends React.Component{
    render() {
        return (
                   <>
            <div className="justify-content-center">
                    <button onClick={
                        (e) => {
                            
                            this.props.history.push("./ownerReg");
                            
                        }
                    }    
                    >OwnerRegister</button>
                    <button onClick={
                        (e) => {
                            this.props.history.replace("./home" , this.state);
                        }
                    }
                    >Buyer</button>
                    <button
                        onClick={
                        (e) => { this.props.history.replace("./home" , this.state);     
                        }
                    }
                    >Admin</button>
            </div>
            <Switch>
                <Route exact path='owner' component={ownerReg} />
            </Switch>
        </>
            
        )
    }
}

export default Register;