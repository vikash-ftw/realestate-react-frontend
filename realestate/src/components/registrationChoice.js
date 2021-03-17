import React from "react";

class Register extends React.Component {
  render() {
    return (
      <>
        <div className="row">
          <br></br>
        </div>
        <div>
          <div className="row">
            <div className="col text-center">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  this.props.history.push("./ownerReg");
                }}
              >
                Owner
              </button>
            </div>
          </div>
          <div className="row">
            <br></br>
          </div>

          <div className="row">
            <div className="col text-center">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  this.props.history.push("./buyerReg");
                }}
              >
                Buyer
              </button>
            </div>
          </div>
          <div className="row">
            <br></br>
          </div>
          <div className="row">
            <div className="col text-center">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  this.props.history.push("./adminReg");
                }}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Register;
