import React from "react";

class Register extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <br></br>
        </div>
        <div className="row">
          <div className="col text-center">
            <button
              className="btn btn-outline-success btn-lg"
              onClick={(e) => {
                this.props.history.push("./buyerReg");
              }}
            >
              Buyer Registration
            </button>
          </div>
        </div>
        <div className="row">
          <br></br>
        </div>
        <div className="row">
          <div className="col text-center">
            <button
              className="btn btn-outline-primary btn-lg"
              onClick={(e) => {
                this.props.history.push("./ownerReg");
              }}
            >
              Owner Registration
            </button>
          </div>
        </div>
        <div className="row">
          <br></br>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
