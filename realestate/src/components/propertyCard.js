import React, { Component } from "react";

import Like from "./common/like";

class PropertyCards extends Component {
  state = {};

  handleClick = (currentProp, like) =>{
    this.props.onLike(currentProp, like);
  }

  render() {
    const { properties, onLike, favProperties } = this.props;
    return (
      <div>
        {properties.map((prop) => (
          <div class="card" onClick = {() => this.props.onCardClick(prop)}>
            <div class="row ">
              <div class="col-md-7 px-3">
                <div class="card-block px-6">
                  <h4 class="card-title">
                    {prop.propertyTitle} | <b>Price: Rs.{prop.propertyPrice}</b>
                  </h4>
                  <p class="card-text">
                    Area : {prop.propertyArea}(sqft) | Dimension (lxb) : {prop.dimensionLength} x {prop.dimensionBreadth}
                    <br />
                    Property Type : {prop.propertyType} | Ownership Type : {prop.ownershipType}
                    <br />
                    City : {prop.propertyCity} | Pincode : {prop.propertyPincode}
                  </p>
                  <br />
                  <p class="card-text">
                    Owner Name : {prop.propertyOwner.ownerName} | PhoneNo : {prop.propertyOwner.ownerPhoneNo}
                  </p>
                  <br />
                  
                   <span className="ml-auto"><i>Mark favourite</i> - <Like
                    favProps = {favProperties}
                    currentProp = {prop}
                    onClick = {this.handleClick}
                  /></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default PropertyCards;
