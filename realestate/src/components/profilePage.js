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
                this.props.history.push("/");
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
          <>
            <ul>
              <li>Name : {name}</li>
              <li>Email : {email}</li>
              <li> Phone : {phoneNo}</li>
              <li>IdProof : {idProof}</li>
                    <li>City : {city}</li>
                    <li><button onClick={this.handleUpdate}>Update</button></li>
            </ul>
          </>
        );
    }
}
 
export default Profile;