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
            <br />
          </div>
          <div className="row">
            <div className="col-8">
              <h4>{name}'DashBoard</h4>
            </div>
            <div className="col">
              <h5>
                <button className="btn btn-success" onClick={() => this.props.history.push("/propertyReg")}>
                  +AddNewProperty
                </button>
              </h5>
            </div>
          </div>
          <div className="row">
            <br />
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-10 col-md-offset-1">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>PropertyId</th>
                    <th>Area</th>
                    <th className="text-center">Property Type</th>
                    <th className="text-center">Ownership Type</th>
                    <th> Price</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((val) => {
                    return (
                      <tr key={val.propertyId}>
                        <td className="col-sm-1 col-md-1">
                          <div>{val.propertyId}</div>
                        </td>
                        <td className="col-sm-1 col-md-1 text-center">
                          <div>{val.propertyArea}</div>
                        </td>
                        <td className="col-sm-1 col-md-1 text-center">
                          {val.propertyType}
                        </td>
                        <td className="col-sm-1 col-md-1 text-center">
                          {val.ownershipType}
                        </td>
                        <td className="col-sm-1 col-md-1 text-center">
                          {val.propertyPrice}
                        </td>
                        <td>
                          <button
                            className="btn btn-warning"
                            onClick={() => this.updateLandData(val.propertyId)}
                          >
                            update
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => this.deleteProperty(val.propertyId)}
                          >
                            delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default OwnerDash;
// const {
//     propertyTitle,
//     propertyArea,
//     dimensionLength,
//     dimensionBreadth,
//     propertyPrice,
//     propertyType,
//     ownershipType,
//     latitude,
//     longitude,
//     propertyCity,
//     propertyPincode,
//     propertyRegistDate,
//   } = res.data;
