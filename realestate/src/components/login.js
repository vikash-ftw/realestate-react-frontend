import React from 'react';
import css from '../css/login.css';
import Axios from 'axios';


class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            users : [],    
            isLogin: false,
            isOwner: false,
            isBuyer: false,
            isAdmin: true,
            userRole : ''
            
            
        }
       
    }

    loginProcess() {
        console.log(this.state.email, this.state.password);
        Axios.post("http://localhost:8080/realEstate/owner/login",
            { email: this.state.email, password: this.state.password }).then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data));
                console.log(response.data);
                console.log('onlogin');
            })
        
        
    }



    render() {
        return (
        <>
            <div className="justify-content-center">
                    <button onClick={
                        (e) => {
                            this.setState({ userRole: 'Owner', isOwner: true });
                            localStorage.setItem('userRole', this.state.userRole);
                            console.log(this.state.userRole, this.state.isOwner);
                           // this.props.history.replace("./home" , this.state);
                            
                        }
                    }    
                    >Owner</button>
                    <button onClick={
                        (e) => {
                            this.setState({ userRole: 'Buyer', isBuyer: true });
                            localStorage.setItem('userRole', this.state.userRole);
                            console.log(this.state.userRole)
                        }
                    }
                    >Buyer</button>
                    <button
                        onClick={
                        (e) => {
                            this.setState({ userRole: 'Admin', isAdmin: true });
                            localStorage.setItem('userRole', this.state.userRole);
                            console.log(this.state.userRole);
                        }
                    }
                    >Admin</button>
            </div>
            {
                    
            }  
        </>
        )
    }


}

export default Login;