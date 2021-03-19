import React, { Component } from 'react';
class Profile extends Component {
    state = {}
    handleUpdate = () => {
        const type = this.props.actorType;
        switch (type) {
            case "owner":
                this.props.history.push('/ownerUpdate');
            break;
            case "buyer":
                this.props.history.push("/buyerUpdate");
            break;
            case "admin":
                this.props.history.push("/");
            break;

          default:
            break;
        }
    }
    render() {
        const {
            id,
            name,
            email,
            password,
            phoneNo,
            idProof,
            city,
            pinCode,
            regDate,
        } = this.props.user;
        return (
          <div className="container">
            <ul>
              <li>Name : {name}</li>
              <li>Email : {email}</li>
              <li> Phone : {phoneNo}</li>
              <li>City : {city}</li>
              <li></li>
            </ul>
            <button onClick={this.handleUpdate}>Update</button>
          </div>
        );
    }
}
 
export default Profile;