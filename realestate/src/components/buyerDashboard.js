import React, { Component } from "react";
import Axios from "axios";

class BuyerDashboard extends Component {
  state = {
  };

  componentDidMount() {
    this.props.onLogin("buyer")
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
