import React, {Component} from 'react';

import axios from 'axios';
import values from '../values/values.json';

export default class Register extends Component {

    state = {
        top: true,
        bottom: false,
        companyName: "",
        companyAddress:"",
        companyTelephone:"",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        farmer: "false",
        supervisor: "false",
        admin: "false",
        btnLoading: false,
        btnNext: "Next",
        btnPrevious: "Previous",
        btnText: "Submit"
    }

    openNext = event => {
        event.preventDefault();
        this.setState({
            top: false,
            bottom: true
        })
    }

    openPrevious = event => {
        event.preventDefault();

        this.setState({
            top: true,
            bottom: false
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            btnLoading: true
        })
        let data = {
            companyName: this.state.companyName,
            companyAddress: this.state.companyAddress,
            companyTelephone: this.state.companyTelephone,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            permission: {
                farmer: this.state.farmer,
                supervisor: this.state.supervisor,
                admin: this.state.admin
            }

        }

        axios.post(values.URL + '/signup', data)
            .then((response) => {
                if (response.status === 200) {
                    alert(response.data.message);
                    this.setState({
                        btnLoading: false,
                        btnText: "User Added!",
                    });

                    setTimeout(() => {
                        this.setState({
                            btnLoading: false,
                            btnText: "Submit"
                        })
                    }, 2000)
                }
            })
            .catch((error) => {
                this.setState({
                    btnLoading: false,
                    btnText: "Error!"
                })

                setTimeout(() => {
                    this.setState({
                        btnLoading: false,
                        btnText: "Add New User"
                    })
                }, 2000)
            });

    }

    handleInputChange = event => {
        const target = event.target;
        const value = (target.type === "checkbox") ? target.checked.toString() : target.value;
        const inputName = target.name;

        console.log(typeof value)

        this.setState({
            [inputName]: value
        })
    }

    render() {
        return (

            <div className="content-wrapper">
                <section className="content-header">
                    {
                        this.state.top ?
                            <div className="box box-info">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Company Details</h3>
                                </div>
                                <form className="form-horizontal" onSubmit={this.openNext}>
                                    <div className="box-body">
                                        <div className="form-group">
                                            <label className="col-sm-2 control-label">Company Name</label>

                                            <div className="col-sm-10">
                                                <input type="text" required className="form-control" id="companyName"
                                                       name="companyName"
                                                       onChange={this.handleInputChange} placeholder="Company Name"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 control-label">Company Address</label>

                                            <div className="col-sm-10">
                                                <input type="text" required className="form-control" id="companyAddress"
                                                       name="companyAddress"
                                                       onChange={this.handleInputChange} placeholder="Company Address"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 control-label">Company Telephone</label>

                                            <div className="col-sm-10">
                                                <input type="Number" required className="form-control" id="companyTelephone"
                                                       name="companyTelephone"
                                                       onChange={this.handleInputChange} placeholder="Company Telephone"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-footer">
                                        <button type="submit"
                                                className="btn btn-info pull-right">{this.state.btnNext}</button>
                                    </div>

                                </form>
                            </div>
                            : null
                    }
                    {
                        this.state.bottom ?

                                <div className="box box-info">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Admit Details</h3>
                                    </div>
                                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                        <div className="box-body">
                                            <div className="form-group">
                                                <label className="col-sm-2 control-label">Email</label>

                                                <div className="col-sm-10">
                                                    <input type="email" className="form-control" id="email" name="email"
                                                           onChange={this.handleInputChange} placeholder="Email"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-sm-2 control-label">Password</label>

                                                <div className="col-sm-10">
                                                    <input type="password" className="form-control" id="password"
                                                           name="password" onChange={this.handleInputChange}
                                                           placeholder="Password"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-sm-2 control-label">First Name</label>

                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="firstName"
                                                           name="firstName" onChange={this.handleInputChange}
                                                           placeholder="First Name"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-sm-2 control-label">Last Name</label>

                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="lastName"
                                                           name="lastName" onChange={this.handleInputChange}
                                                           placeholder="Last Name"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-footer">

                                            <button type="submit"
                                                    className="btn btn-info pull-right">{this.state.btnText}</button>
                                            {/*<button type="submit"*/}
                                                    {/*className="btn btn-info pull-right">{this.state.btnPrevious}</button>*/}
                                        </div>

                                    </form>
                                </div>
                            : null
                    }
                </section>
            </div>

        )
    }
}