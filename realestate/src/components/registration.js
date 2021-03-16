import React from "react";

class Register extends React.Component {
  render() {
    return (
      <>
        <div className="justify-content-center">
          <button
            onClick={(e) => {
              this.props.history.push("./ownerReg");
            }}
          >
            OwnerRegister
          </button>
          <button
            onClick={(e) => {
              this.props.history.push("./buyerReg");
            }}
          >
            Buyer
          </button>
          <button
            onClick={(e) => {
              this.props.history.replace("./adminReg", this.state);
            }}
          >
            Admin
          </button>
        </div>
      </>
    );
  }
}

export default Register;
