import React, { Component } from "react";

class BuyerDashboard extends Component {
  state = {
    user: this.props.user,
    properties: []
  };

  componentDidMount() {
    this.props.onLogin("buyer");
    console.log("cdm:", this.state.user);
  }

  componentDidUpdate(prevProps){
    if(prevProps.user.id !== this.props.user.id) {
      this.setState({user : this.props.user});
    }
    console.log("in cdu", this.state.user);
  }

  render() {
    const {name, city} = this.state.user;
    return (
      <div>
        <h2>{name}'s dashboard</h2>
        <div className="row">
          <div className="col-10">
            <div>
              <h3>Map</h3>
            </div>
            <div>
              <h3>Property in your city</h3>
            </div>
          </div>
          <div className="col">
            <h3>Filtering criteria</h3>
            <ul>
              <li>By price</li>
              <li>By dimension</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default BuyerDashboard;
