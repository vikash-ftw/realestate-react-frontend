import Axios from "axios";
import React from "react";
import OwnerAxios from '../service/ownerAxios'
class OwnerDash extends React.Component {
  state = {
    id: this.props.user.id,
    landProperties: [
      {
        propertyTitle: "",
        propertyArea: "",
        dimensionLength: "",
        dimensionBreadth: "",
        propertyPrice: "",
        propertyType: "",
        ownershipType: "",
        latitude: "",
        longitude: "",
        propertyCity: "",
        propertyPincode: "",
        propertyRegistDate: "",
      },
    ],
  };

  componentDidMount() {
    this.props.onLogin("owner");
    OwnerAxios.fetchMyPropertyById(localStorage.getItem("actorId")).then((res) => {
      const land = res.data;
      this.setState({ landProperties: land });
    });
  }

  // "ownerId": 4,
  // "ownerName": "root",
  // "ownerEmail": "mangesh@gmail.com",
  // "ownerPassword": "root",
  // "ownerPhoneNo": "8208668672",
  // "ownerIdProof": "12345678",
  // "ownerCity": "pune",
  // "  ": null,
  // "ownerRegistDate": "1997-02-22",
  // "landProperties": []
  deleteProperty = (id) => {
    const ownerId = this.props.user.id;
    OwnerAxios.deletePropertyByIdAndLandId(ownerId , id).then((res) => {
     OwnerAxios.fetchMyPropertyById(localStorage.getItem("actorId")).then(
       (res) => {
         const land = res.data;
         this.setState({ landProperties: land });
       }
     );
    });
  };

  updateLandData = (propertyId) => {
    this.props.sendPropertyId(propertyId);
    this.props.history.push("/updateLandProperty");
  };

  render() {
    // console.log("render called");
    const { name, email } = this.props.user;
    console.log(this.props.user, "in ownerDash");

    const list = this.state.landProperties;
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-9">
              <h2>{name}' dashboard</h2>
            </div>
            <div className="col">
              <button
                className="btn btn-success"
                onClick={() => this.props.history.push("/propertyReg")}
              >
                + AddNewProperty
              </button>
            </div>
          </div><div><br/></div>
          <table className="table table-hover table-striped">
            <thead className="thead-dark">
              <tr>
                <th>PropertyId</th>
                <th>Price</th>
                <th>Area</th>
                <th>Property Type</th>
                <th>Ownership Type</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((val) => (
                <tr key={val.propertyId}>
                  <td>{val.propertyId}</td>
                  <td>{val.propertyPrice}</td>
                  <td>{val.propertyArea}</td>
                  <td>{val.propertyType}</td>
                  <td>{val.ownershipType}</td>
                  <td>{val.propertyCity}</td>
                  <td>
                    <button
                      className="btn btn-warning mr-3"
                      onClick={() => this.updateLandData(val.propertyId)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteProperty(val.propertyId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default OwnerDash;