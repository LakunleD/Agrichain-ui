import React, {Component} from 'react';

import { Redirect, Link, Route, Switch } from "react-router-dom";
import cookies from "react-cookies";
import axios from "axios";

import values from './values/values.json';


import Login from './components/Login';
import Dash from './components/Dash';
import Blank from './components/Blank';
import User from './components/User';
import AddUser from './components/AddUser';
import Register from './components/Register';

class App extends Component {

    constructor() {
        super();

        let token = cookies.load(values.TOKEN_COOKIE_KEY);

        if (token === undefined || token === null)
            token = null;

        this.state={
            token:token,
            user:"",
            redirect: false,
            register: false
        }
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLogOutClicked = this.onLogOutClicked.bind(this);
        this.onRegisterClick = this.onRegisterClick.bind(this);
    }

    onLogOutClicked() {
        this.setState({
            token: null,
            redirect: true
        })

        cookies.remove(values.TOKEN_COOKIE_KEY);
    }

    onRegisterClick(){
        this.setState({
            register:true
        })
    }

    onRegisterSuccess(){
        this.setState({
            register:false
        })
    }

    onLoginSuccess(userDetails) {

        let token = userDetails.token;
        // Set cookies
        cookies.save('token', token, {
            path: '/',
            secure: values.VALUE_COOKIE_HTTPS_ONLY
        });

        setTimeout(() => {
            this.setState({
                token: token,
                redirect: false
            })
        }, 2000) //two seconds

    }

    render() {
        return (
            <div>
                {
                    this.state.register ? <Register onRegisterSuccess={this.onRegisterSuccess}/> : null
                }
                {
                    (this.state.redirect === true || this.state.token === null) ? <Login onRegisterClick={this.onRegisterClick} onLoginSuccess={this.onLoginSuccess}/> : null
                }
                {
                    (this.state.token !== null) ?
                        <Dash logout={this.onLogOutClicked} token={this.state.token}/>:null
                }

                <Switch>
                    <Route path="/login" component={Login} />
                    <Route exact path="/dash" component={Dash} />
                    <Route path="/adduser" component={AddUser} />
                    <Route path="/user" component={User} />
                    <Route path="/blank" component={Blank} />
                    <Route path="/register" component={Register} />
                </Switch>
            </div>

        );
    }
}

export default App;
