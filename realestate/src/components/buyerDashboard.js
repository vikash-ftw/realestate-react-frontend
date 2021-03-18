import React, { Component } from "react";
import Axios from "axios";

class BuyerDashboard extends Component {
  state = {
    buyer: {
      id: "",
      name: "",
      email: "",
      city: "",
    },
  };

  componentDidMount() {
    const id = this.props.actorId;
    this.props.onLogin(this.props.name, this.props.actorType);
    Axios.get(`http://localhost:8080/realEstate/buyer/${id}`).then((res) => {
      console.log("in buyer profile");
      console.log(res.data);
      const { buyerName, buyerEmail, buyerCity } = res.data;
      this.setState({
        id: id,
        name: buyerName,
        email: buyerEmail,
        city: buyerCity,
      });
    });
  }

  render() {
    return(
        <div>
            <h2>Buyer dashboard</h2>
            <h5>
                
            </h5>
        </div>
    );
  }
}

export default BuyerDashboard;
