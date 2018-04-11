import React, {Component} from 'react';

import axios from 'axios';

import values from '../values/values.json';

export default class Login extends Component {

    state={
        email:"",
        password:"",
        btnText:"Sign In"
    }

    handleInputChange= event => {
        const target = event.target;
        const value = (target.type === "checkbox") ? target.checked.toString() : target.value;
        const inputName = target.name;

        this.setState({
            [inputName]:value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            btnLoading:true
        })
        let data = {
            email:this.state.email,
            password:this.state.password
        }

        axios.post(values.URL+'/auth', data)

            .then((response) => {
                if (response.status === 200) {
                    alert(response.data.message);
                    this.setState({
                        btnLoading:false,
                        btnText:"Success!"
                    });
                    this.props.onLoginSuccess(response.data);
                }
            })
            .catch((error) => {
                this.setState({
                    btnLoading:false,
                    btnText:"Error!"
                })

                setTimeout(() => {
                    this.setState({
                        btnLoading:false,
                        btnText:"Sign In"
                    })
                }, 2000)
            });

    }

    render() {
        return (
            <div>
                <div className="login-box">
                    <div className="login-logo">
                        <a href="#"><b>Admin</b>LTE</a>
                    </div>
                    <div className="login-box-body">
                        <p className="login-box-msg">Sign in to start your session</p>

                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group has-feedback">
                                <input type="email" className="form-control" name="email" placeholder="Email" onChange={this.handleInputChange}/>
                                    <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                            </div>
                            <div className="form-group has-feedback">
                                <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleInputChange}/>
                                    <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                            </div>
                            <div className="row">
                                <div className="col-xs-4">
                                    <button type="submit" className="btn btn-primary btn-block btn-flat">{this.state.btnText}</button>
                                </div>
                            </div>
                        </form>

                        <a href="#">I forgot my password</a><br/>
                    </div>
                </div>
            </div>
        )
    }
}
