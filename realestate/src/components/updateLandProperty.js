import React, { Component } from 'react';
class UpdateLandProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
          propertyTitle : '',
          propertyArea : "",
          dimensionLength : "",
          dimensionBreadth : "",
          propertyPrice: "",
          propertyType :"",
          ownershipType: "",
          latitude :"",
          longitude : "",
          propertyCity : "",
          propertyPincode : "",
          propertyRegistDate :"",
        };
    }
    render() { 
        return (
          <>
            <form className="col-lg-6 offset-lg-3 justify-content-center">
              <div className="form-group">
                <label>Owner ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="0InputEmail"
                  aria-describedby="emailHelp"
                  placeholder={id}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Owner Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="0InputEmail"
                  aria-describedby="emailHelp"
                  placeholder={name}
                  onChange={(e) => {
                    this.setState({ name: e.target.value });
                  }}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="name"
                  aria-describedby="name"
                  placeholder={email}
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder={password}
                  onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}
                />
              </div>

              <div className="form-group">
                <label>PhoneNumber</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={phoneNo}
                  onChange={(e) => {
                    this.setState({ phone: e.target.value });
                  }}
                />
              </div>
              <div className="form-group">
                <label>OwnerIdProof</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={idProof}
                  onChange={(e) => {
                    this.setState({ IdProof: e.target.value });
                  }}
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={city}
                  onChange={(e) => {
                    this.setState({ city: e.target.value });
                  }}
                />
              </div>
              <div className="form-group">
                <label>PinCode</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={pinCode}
                  onChange={(e) => {
                    this.setState({ pinCode: e.target.value });
                  }}
                />
              </div>
            </form>
            <div className="row">
              <div className="col text-center">
                <button className="btn btn-primary" onClick={this.updateOwner}>
                  Update
                </button>
              </div>
            </div>
          </>
        );
    }
}
 
export default UpdateLandProperty;
