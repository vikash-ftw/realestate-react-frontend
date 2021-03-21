import React from "react";
import Axios from "axios";
import OwnerAxios from "./../service/ownerAxios";

class AdminDashboard extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    admin: {},
    owner: [{}],
    buyer: [{}],
    isOwnerList: false,
    isBuyerList: false,
  };

  componentDidMount() {
    this.props.onLogin("admin");
    this.setState({ admin: this.props.user });

    OwnerAxios.fetchOwner().then((res) => {
      console.log(res.data);
      this.setState({ owner: res.data });
    });
    Axios.get(`http://localhost:8080/realEstate/buyer`).then((res) => {
      console.log(res.data);
      this.setState({ buyer: res.data });
      console.log(this.state.buyer, "in admin dash");
    });
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.user.id !== this.props.user.id) {
  //     this.setState({admin : this.props.user})
  //   }
  // }
  mangListState = (isOList, isBList) => {
    this.setState({ isBuyerList: isBList, isOwnerList: isOList });
  };

  deleteBuyer = (id) => {
    console.log("in buyer del");
    Axios.delete(`http://localhost:8080/realEstate/buyer/delete/${id}`).then(
      () => {
        Axios.get(`http://localhost:8080/realEstate/buyer`).then((res) => {
          this.setState({ buyer: res.data });
        });
      }
    );
  };

  deleteOwner = (id) => {
    OwnerAxios.deleteOwner(id).then(() => {
      OwnerAxios.fetchOwner().then((res) => {
        this.setState({ owner: res.data });
      });
    });
  };

  render() {
    const buyerList = this.state.buyer;
    const ownerList = this.state.owner;
    return (
      <>
        <div className="container">
          <div className="row">
            <br />
          </div>
          <div className="row">
            <div className="col-8">
              <h4>Admin DashBoard</h4>
            </div>
            <div className="col">
              <h5>
                <button
                  className="btn btn-success"
                  onClick={() => this.props.history.push("/adminReg")}
                >
                  +Add New Admin
                </button>
              </h5>
            </div>
          </div>
          <div className="row center">
            <h5>
              <button
                className="btn btn-warning m-2"
                onClick={() => this.mangListState(true, false)}
              >
                Show Owner List
              </button>
            </h5>
            <h5>
              <button
                className="btn btn-warning m-2"
                onClick={() => this.mangListState(false, true)}
              >
                Show Buyer List
              </button>
            </h5>
          </div>
        </div>
        {this.state.isOwnerList ? (
          <>
            {" "}
            <div className="container">
              <div className="row">
                <br />
              </div>
              <div className="row">
                <h2 className="text-center">Owner</h2>
              </div>
              <div className="row">
                <br />
              </div>
              <div className="container">
                <div className="row">
                  <div>
                    {" "}
                    {/* //"col-sm-12 col-md-10 col-md-offset-1" */}
                    <table className="table table-hover center">
                      <thead>
                        <tr>
                          <th>Email</th>
                          <th>Id</th>
                          <th>Name</th>

                          <th>PhoneNumber</th>
                          <th>City</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {ownerList.map((val) => {
                          return (
                            <tr>
                              <td className="col-sm-1 col-md-1">
                                <div>{val.ownerEmail}</div>
                              </td>
                              <td className="col-sm-1 col-md-1 ">
                                <div>{val.ownerId}</div>
                              </td>
                              <td className="col-sm-1 col-md-1 ">
                                {val.ownerName}
                              </td>
                              <td className="col-sm-1 col-md-1 ">
                                {val.ownerPhoneNo}
                              </td>
                              <td className="col-sm-1 col-md-1">
                                {val.ownerCity}
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => this.deleteOwner(val.ownerId)}
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
            </div>
          </>
        ) : (
          <>
            <div className="container">
              <div className="row">
                <br />
              </div>
              <div className="row">
                <h2 className="text-center">Buyer</h2>
              </div>
              <div className="row">
                <br />
              </div>
              <div className="container">
                <div className="row">
                  <div>
                    {" "}
                    {/* //"col-sm-12 col-md-10 col-md-offset-1" */}
                    <table className="table table-hover center">
                      <thead>
                        <tr>
                          <th>Email</th>
                          <th>Id</th>
                          <th>Name</th>

                          <th>PhoneNumber</th>
                          <th>City</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {buyerList.map((val) => {
                          return (
                            <tr>
                              <td className="col-sm-1 col-md-1">
                                <div>{val.buyerEmail}</div>
                              </td>
                              <td>
                                <div>{val.buyerId}</div>
                              </td>
                              <td>{val.buyerName}</td>
                              <td className="col-sm-1 col-md-1">
                                {val.buyerPhoneNo}
                              </td>
                              <td className="col-sm-1 col-md-1">
                                {val.buyerCity}
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => this.deleteBuyer(val.buyerId)}
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
            </div>
          </>
        )}
      </>
    );
  }
}

export default AdminDashboard;
