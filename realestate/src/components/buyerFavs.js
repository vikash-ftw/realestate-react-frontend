import React, { Component } from 'react';
import BuyerApiService from '../service/buyerAxios'

class BuyerFavourite extends Component {
    state = { 
        favProps : []
     }

    componentDidMount() { 
       const buyerId = localStorage.getItem("actorId");
       BuyerApiService.fetchAllFavProperty(buyerId).then((res)=>{
           const favProps = res.data;
           this.setState({ favProps });
       })
    }

    handleRemove = (propId) => {
        BuyerApiService.unmarkFavProp({
            propertyId: propId,
            buyerId: localStorage.getItem("actorId")
        }).then((res)=> {
            console.log(res.data)
            const favProps = this.state.favProps.filter(
                (p) => p.propertyId != propId
              );
            this.setState({ favProps });
        });
    }

    render() {
        const {length : count}  = this.state.favProps; 
        if(count ===0 ) return <h3><i>No items in favourite</i></h3>
        return ( 
            <div>
                <h3><i>There are total {count} favourite items</i></h3>
                { this.state.favProps.map((prop) => (
                    <div class="card">
                        <div class="row ">
                            <div class="col-md-7 px-3">
                                <div class="card-block px-6">
                                    <h4 class="card-title">
                                        {prop.propertyTitle} | <b>Price: Rs.{prop.propertyPrice}</b>
                                        </h4>
                                         <p class="card-text">
                                            Area : {prop.propertyArea}(sqft) | Dimension :{" "}
                                            {prop.dimensionLength}x{prop.dimensionBreadth}
                                            <br />
                                            Property Type : {prop.propertyType} | Ownership Type :{" "}
                                            {prop.ownershipType}
                                            <br />
                                            City : {prop.propertyCity} | Pincode :{" "}
                                            {prop.propertyPincode}
                                        </p>
                                        <br />
                                        <p class="card-text">
                                        Owner Name : {prop.propertyOwner.ownerName} | Phone No. :{" "}
                                        {prop.propertyOwner.ownerPhoneNo}
                                        </p>
                                        <br />
                                        <button type="button" class="btn btn-danger" onClick={() => this.handleRemove(prop.propertyId)}>Remove from favorites</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                ))}                              
            </div>
         );
    }
}
 
export default BuyerFavourite;