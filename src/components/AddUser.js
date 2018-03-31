import React, {Component} from 'react';

import axios from 'axios';

export default class AddUser extends Component {

    state={
        email: "",
        password:"",
        firstName:"",
        lastName:"",
        farmer: "false",
        supervisor:"false",
        admin:"false",
        btnLoading:false,
        btnText:"Add New User"
    }


    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            btnLoading:true
        })
        let data = {
            email:this.state.email,
            password:this.state.password,
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            permission:{
                farmer: this.state.farmer,
                supervisor:this.state.supervisor,
                admin:this.state.admin
            }

        }

        axios.post('http://localhost:8020/users', data)
            .then((response) => {
                if (response.status === 200) {
                    alert(response.data.message);
                    this.setState({
                        btnLoading:false,
                        btnText:"User Added!",
                    });

                    setTimeout(() => {
                        this.setState({
                            btnLoading:false,
                            btnText:"Add New User"
                        })
                    }, 2000)
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
                        btnText:"Add New User"
                    })
                }, 2000)
            });

    }

    handleInputChange= event => {
        const target = event.target;
        const value = (target.type === "checkbox") ? target.checked.toString() : target.value;
        const inputName = target.name;

        console.log(typeof value)

        this.setState({
            [inputName]:value
        })
    }

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="col-sm-offset-3 col-md-6">
                        <div className="box box-info">
                            <div className="box-header with-border">
                                <h3 className="box-title">Signup Form</h3>
                            </div>
                            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                <div className="box-body">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Email</label>

                                        <div className="col-sm-10">
                                            <input type="email" className="form-control" id="email" name="email" onChange={this.handleInputChange} placeholder="Email"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Password</label>

                                        <div className="col-sm-10">
                                            <input type="password" className="form-control" id="password" name="password" onChange={this.handleInputChange} placeholder="Password"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">First Name</label>

                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="firstName" name="firstName" onChange={this.handleInputChange} placeholder="First Name"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Last Name</label>

                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="lastName" name="lastName" onChange={this.handleInputChange} placeholder="Last Name"/>
                                        </div>
                                    </div>
                                    <div className="form-group" name="roles" onChange={this.handleInputChange}>
                                        <label className="col-sm-2 control-label">Roles</label>
                                        <div className="col-sm-10">
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" name="supervisor" value="supervisor"/>
                                                    Supervisor
                                                </label>
                                            </div>

                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" name="farmer" value="farmer"/>
                                                    Farmer
                                                </label>
                                            </div>

                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" name="admin" value="admin"/>
                                                    Admin
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <button type="submit" className="btn btn-info pull-right">{this.state.btnText}</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
