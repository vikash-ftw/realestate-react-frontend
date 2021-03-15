import React from 'react';
import css from '../css/login.css'

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            users : [],    
            isLogin : false
            
        }
       
    }

    render() {
        return (
    <div id="cover-caption">
        <div class="container">
            <div class="row text-white">
                <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                    <h1 class="display-4 py-2 text-truncate">Login</h1>
                    <div class="px-2">
                        <form action="" class="justify-content-center">
                            <div class="form-group">
                                <label class="sr-only">Email</label>
                                <input type="text" class="form-control" placeholder="Email"/>
                            </div>
                            <div class="form-group">
                                <label class="sr-only">Password</label>
                                <input type="text" class="form-control" placeholder="Password"/>
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg">Launch</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
 </div>
        )
    }


}

export default Login;