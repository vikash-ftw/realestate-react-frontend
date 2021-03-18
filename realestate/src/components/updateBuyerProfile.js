import React, { Component } from 'react';
import Axios from 'axios';

class BuyerUpdateProfile extends Component {
    state = { 
       buyer : {
        id: this.props.user.id,
        name: this.props.user.name,
        email: this.props.user.email,
        password: this.props.user.password,
        phoneNo: this.props.user.phoneNo,
        city: this.props.user.city,
        pinCode: this.props.user.pinCode,
        regDate: new Date()
       }  
     }


    handleUpdate = () =>{
        const {
            id,
            name,
            email,
            password,
            phoneNo,
            city,
            pinCode,
            regDate,
        } = this.state.buyer;

        Axios.put(`http://localhost:8080/realEstate/buyer/update/${id}`,
        {
            buyerId: id,
            buyerName: name,
            buyerEmail: email,
            buyerPassword: password,
            buyerPhoneNo: phoneNo,
            buyerCity: city,
            buyerPincode: pinCode,
            buyerRegistDate: regDate, 
        }).then((res) => console.log(res.data))
    };

    handleInputChange = (e) => {
        const buyer = {...this.state.buyer};
        buyer[e.currentTarget.name] = e.currentTarget.value;
        this.setState({buyer});
    };


    render() { 
        const {
            id, name, email, password, phoneNo, city, pinCode
        } = this.state.buyer;
        return ( 
            <div>
                 <h2 className="text-center">Buyer Updation Page</h2>
                <form className="col-lg-6 offset-lg-3 ">
                <div className="form-group">
                    <label>Buyer ID</label>
                    <input
                    type="text"
                    className="form-control" 
                    name = "id"
                    value = {id}
                    onChange={this.handleInputChange}
                    disabled
                    />
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input
                    type="text"
                    className="form-control"
                    name = "name"
                    value = {name}
                    onChange={this.handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                    type="email"
                    className="form-control"
                    name = "email"
                    value = {email}
                    onChange={this.handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                    type="text"
                    className="form-control"
                    name = "password"
                    value = {password}
                    onChange={this.handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                    type="tel"
                    className="form-control"
                    name = "phoneNo"
                    value = {phoneNo}
                    onChange={this.handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input
                    type="text"
                    className="form-control"
                    name = "city"
                    value = {city}
                    onChange={this.handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Pin code</label>
                    <input
                    type="text"
                    className="form-control"
                    name = "pinCode"
                    value = {pinCode}
                    onChange={this.handleInputChange}
                    />
                </div>
                </form>
                <div className="row">
                <div className="col text-center">
                    <button className="btn btn-primary" onClick={this.handleUpdate}>
                        Update
                    </button>
                </div>
                </div>
            </div>
         );
    }
}
 
export default BuyerUpdateProfile;