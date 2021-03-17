import { Component } from "react";
import Axios from "axios";

class OwnerProfile extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    regDate: null,
  };

  componentDidMount() {
    const id = this.props.actorId;
    this.props.onLogin(this.props.name);
    Axios.get(`http://localhost:8080/realEstate/admin/${id}`).then((res) => {
      console.log("in Admin profile");
      console.log(res.data);
      const {
        adminName,
        adminEmail,
        adminPassword,
        adminRegistDate,
      } = res.data;
      this.setState({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        regDate: adminRegistDate,
      });
    });
  }

  render() {
    return (
      <>
        {this.state.email}
        {this.state.name}
        {this.state.password}
        {this.state.regDate}
        <h1>----</h1>
        {this.props.isLogin}
      </>
    );
  }
}

export default OwnerProfile;
