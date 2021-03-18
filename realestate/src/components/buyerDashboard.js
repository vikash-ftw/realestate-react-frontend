import React, { Component } from "react";
import Axios from "axios";

class BuyerDashboard extends Component {
  state = {
    landProperty : {},
  };

  componentDidMount = ()=> {
    console.log("com did mount cld");
    this.props.onLogin("buyer")
    console.log("after login cld");
    console.log("user", this.props.user);
    Axios.get(`http://localhost:8080/realEstate/LandProperty/city/${this.props.user.city}`)
    .then((res) => {
      console.log(res.data);
    })
  }

  render() {
    const {id, name} = this.props.user
    return(
        <div>
            <h2>{name}'s dashboard</h2>
            <h5>
                
            </h5>
        </div>
    );
  }
}

export default BuyerDashboard;
