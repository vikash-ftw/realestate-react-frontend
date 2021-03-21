import React, { Component } from "react";
import PropertyApiService from "../service/propertiesAxios";
import { paginate } from "./../utils/paginate";
import Pagination from "./common/pagination";
import PropertyCards from "./propertyCard";
import PropertyTable from "./propertyTable";
import BuyerApiService from "../service/buyerAxios";

class BuyerDashboard extends Component {
  state = {
    user: this.props.user,
    properties: [],
    favProperties: [],
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    this.props.onLogin("buyer");
    console.log("cdm:", this.state.user);
    const user = { ...this.state.user };
    if (user !== "") {
      PropertyApiService.fetchByCity(user.city).then((res) => {
        const properties = res.data;
        this.setState({ properties });
      });
      BuyerApiService.fetchAllFavProperty(user.id).then((res) => {
        const favProperties = res.data;
        this.setState({ favProperties });
      });
    }
  }

  componentDidUpdate(prevProps) {
    console.log("in cdu", this.state.user);
    if (prevProps.user.id !== this.props.user.id) {
      this.setState({ user: this.props.user });
      PropertyApiService.fetchByCity(this.props.user.city).then((res) => {
        const properties = res.data;
        this.setState({ properties });
      });
      BuyerApiService.fetchAllFavProperty(this.props.user.id).then((res) => {
        const favProperties = res.data;
        this.setState({ favProperties });
      });
    }
  }

  handlePageChange = (page) => {
    //changing the currentPage we got from Pagination arised event
    const currentPage = page;
    this.setState({ currentPage: currentPage });
  };

  handleLike = (prop, like) => {
    console.log("like btn clicked");
    console.log(prop);
    console.log(like);
    if (like === false) {
      BuyerApiService.markFavProp({
        propertyId: prop.propertyId,
        buyerId: this.state.user.id,
      }).then((res) => {
        console.log(res.data);
        const favProperties = [prop, ...this.state.favProperties];
        this.setState({favProperties});
      });
    } else {
      BuyerApiService.unmarkFavProp({
        propertyId: prop.propertyId,
        buyerId: this.state.user.id,
      }).then((res) => {
        console.log(res.data);
        const favProperties = this.state.favProperties.filter((p) => p.propertyId != prop.propertyId);
        this.setState({favProperties});
      });
    }
  };

  render() {
    const { name, city } = this.state.user;
    const { length: count } = this.state.properties;
    // const properties = paginate(
    //   this.state.properties,
    //   this.state.currentPage,
    //   this.state.pageSize
    // );
    return (
      <div>
        <h2>{name}'s dashboard</h2>
        <div className="row">
          <div className="col-10">
            <div>
              <h3>Map</h3>
            </div>
            {count === 0 ? (
              <p>There are no land property to show in your city</p>
            ) : (
              <div>
                <p>Displaying {this.state.properties.length} properties</p>
                <PropertyCards
                  properties={this.state.properties}
                  favProperties={this.state.favProperties}
                  onLike={this.handleLike}
                ></PropertyCards>
                {/* <PropertyTable
                  properties={properties}
                  onLike={this.handleLike}
                ></PropertyTable> */}
                {/* <Pagination
                  itemsCount={count}
                  pageSize={this.state.pageSize}
                  currentPage={this.state.currentPage}
                  onPageChange={this.handlePageChange}
                ></Pagination> */}
              </div>
            )}
          </div>
          <div className="col">
            <h3>Filtering criteria</h3>
            <ul>
              <li>By price</li>
              <li>By dimension</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default BuyerDashboard;
