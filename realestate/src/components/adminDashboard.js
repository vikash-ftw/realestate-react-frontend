import { Component } from "react";
import Axios from "axios";

class AdminDashboard extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    regDate: null,
    admin : {}
  };
  

  componentDidMount() {
    this.props.onLogin("admin");
    this.setState({ admin: this.props.user })
    console.log(this.state.admin , "admin state");
    console.log(this.props.user , "admin propbs")
  }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.user.id !== this.props.user.id) {
  //     this.setState({admin : this.props.user})
  //   }
  // }

  render() {
    console.log(this.state.admin)
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

export default AdminDashboard;
