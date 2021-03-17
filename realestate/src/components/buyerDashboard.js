import React, { Component } from "react";
import Axios from 'axios';

class BuyerDashboard extends Component {
  state = {
      buyer : {
          id : "",
          name : "",
          email : "",
      }
  };

  componentDidMount(){
      const id = this.props.actorId;
      this.props.onLogin(this.props.name, this.props.actorType);
      Axios.get(`https://localhost:8080/realEstate/buyer/${id}`).then(
          (res) => {
              console.log("in buyer profile");
              console.log(res.data);
              const {buyerName, buyerEmail } = res.data;
              this.setState({
                  id : id,
                  name : buyerName,
                  email : buyerEmail
              });
          });
  }

  render() {
    return <h2>Buyer dashboard</h2>;
  }
}



export default BuyerDashboard;
