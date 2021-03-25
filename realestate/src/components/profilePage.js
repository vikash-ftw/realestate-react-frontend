import React, { Component } from 'react';
class Profile extends Component {
  state = { actorType: localStorage.getItem("actorType") };
  handleUpdate = () => {
    const type = this.props.actorType;
    switch (type) {
      case "owner":
        this.props.history.push("/ownerUpdate");
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
  };
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
        <div className="row">
          <div>
            <h1 className="display-4 py-2 text-truncate">Profile</h1>
            <div className="px-2">
              <form className="justify-content-center">
                <div className="form-group">
                  <h1 className="display-5 py-2">Name : {name}</h1>
                </div>
                <div className="form-group">
                  <h1 className="display-5 py-2 ">Email : {email}</h1>
                </div>
                {this.state.actorType === "Admin" ? (
                  <> </>
                ) : (
                  <>
                    <div className="form-group">
                      <h1 className="display-5 py-2 ">Phone : {phoneNo}</h1>
                    </div>
                    <div className="form-group">
                      <h1 className="display-5 py-2 ">City : {city}</h1>
                    </div>
                  </>
                )}
              </form>
              {this.state.actorType === "Admin" ? (
                <> </>
              ) : (
                <div className="row">
                  <div className="col text-center">
                    <div className="form-group m-0">
                      <button
                        type="submit"
                        className="btn btn-secondary btn-block"
                        onClick={this.handleUpdate}
                      >
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
export default Profile;