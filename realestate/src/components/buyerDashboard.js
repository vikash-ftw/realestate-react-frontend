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
    searchCity: "",
    length: "",
    breadth: "",
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
        this.setState({ favProperties });
      });
    } else {
      BuyerApiService.unmarkFavProp({
        propertyId: prop.propertyId,
        buyerId: this.state.user.id,
      }).then((res) => {
        console.log(res.data);
        const favProperties = this.state.favProperties.filter(
          (p) => p.propertyId != prop.propertyId
        );
        this.setState({ favProperties });
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleCitySearch = () => {
    if (this.state.searchCity !== "") {
      PropertyApiService.fetchByCity(this.state.searchCity).then((res) => {
        const properties = res.data;
        this.setState({ properties });
      });
    }
  };

  handlePriceSearch = (min, max = 1) => {
    if (max === 1) {
      PropertyApiService.fetchByPriceGreaterThan(min).then((res) => {
        const properties = res.data;
        this.setState({ properties });
      });
    } else {
      PropertyApiService.fetchByPriceRange(min, max).then((res) => {
        const properties = res.data;
        this.setState({ properties });
      });
    }
  };

  handleDimensionSearch = () => {
    if (this.state.length !== "" && this.state.breadth !== "") {
      console.log("l :", this.state.length);
      console.log("b :", this.state.breadth);
      PropertyApiService.fetchByDimension(
        this.state.length,
        this.state.breadth
      ).then((res) => {
        console.log(res.data);
        const properties = res.data;
        this.setState({ properties });
      });
    }
  };

  handlePropertyTypeSearch = (propType) => {
    PropertyApiService.fetchByPropertyType(propType).then((res)=>{
      const properties = res.data;
      this.setState({ properties });
    });
  };

  handleOwnershipTypeSearch = (ownershipType) => {
    PropertyApiService.fetchByOwnershipType(ownershipType).then((res)=>{
      const properties = res.data;
      this.setState({ properties });
    })
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
         
        
        <div className="row">
          <div className="col-8">
          <h2>{name}'s dashboard <span><button className = "btn btn-outline-warning"></button></span></h2>
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
            <h3>Filter</h3>
            <ul>
              <li>
                <form
                  onSubmit={this.handleSubmit}
                  id="custom-search-form"
                  class="form-search form-horizontal"
                >
                  <div class="input-append span12">
                    <input
                      type="text"
                      className="search-query"
                      placeholder="Search By City"
                      onChange={(e) => {
                        this.setState({ searchCity: e.target.value });
                      }}
                    />
                    <button
                      type="submit"
                      className="btn"
                      onClick={this.handleCitySearch}
                    >
                      <i class="fa fa-search" aria-hidden="true"></i>
                    </button>
                  </div>
                </form>
              </li>
              <li>
                <div class="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenu2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Price Range
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenu2"
                  >
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={() => this.handlePriceSearch(500000, 2000000)}
                    >
                      5Lac - 20Lac
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={() => this.handlePriceSearch(2000000, 5000000)}
                    >
                      20Lac - 50Lac
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={() => this.handlePriceSearch(5000000, 8000000)}
                    >
                      50Lac - 80Lac
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={() => this.handlePriceSearch(8000000, 10000000)}
                    >
                      80Lac - 1Cr
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={() => this.handlePriceSearch(10000000, 50000000)}
                    >
                      1Cr - 5Cr
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={() => this.handlePriceSearch(50000000)}
                    >
                      {">"} 5Cr
                    </button>
                  </div>
                </div>
              </li>
              <li>
                <h6>Based on dimension</h6>
                <form
                  onSubmit={this.handleSubmit}
                  id="custom-search-form"
                  class="form-search form-horizontal"
                >
                  <div class="input-append span12">
                    <input
                      type="number"
                      className="search-query"
                      placeholder="Enter length"
                      onChange={(e) => {
                        this.setState({ length: e.target.value });
                      }}
                    />
                    <br />
                    <input
                      type="number"
                      className="search-query"
                      placeholder="Enter breadth"
                      onChange={(e) => {
                        this.setState({ breadth: e.target.value });
                      }}
                    />
                    <br />
                    <button
                      type="submit"
                      className="btn btn-outline-success"
                      onClick={this.handleDimensionSearch}
                    >
                      Search
                    </button>
                  </div>
                </form>
              </li>
              <li>
                <div class="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenu2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Property Type
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenu2"
                  >
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={() => this.handlePropertyTypeSearch("RESIDENTIAL")}
                    >
                      Residential
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={() => this.handlePropertyTypeSearch("RENTAL")}
                    >
                      Rental
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={() => this.handlePropertyTypeSearch("AGRICULTURAL")}
                    >
                      Agricultural
                    </button>
                  </div>
                </div>
              </li>
              <li>
                <div class="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenu2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Ownership Type
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenu2"
                  >
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={() => this.handleOwnershipTypeSearch("FREEHOLD")}
                    > 
                    Freehold
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={() =>this.handleOwnershipTypeSearch("LEASEHOLD")}
                    >
                      Leasehold
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={() => this.handleOwnershipTypeSearch("POWEROFATTORNEY")}
                    >
                     Power of Attorney
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default BuyerDashboard;
