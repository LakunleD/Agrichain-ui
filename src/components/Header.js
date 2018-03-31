import React, {Component} from 'react';

import { Link } from "react-router-dom";
import axios from 'axios';

export default class Header extends Component {

    state={
        email:'',
        firstName:'',
        lastName:'',
        permission:''
    }

    componentDidMount() {
        axios({
            url: "http://localhost:8020/getUser",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": this.props.token
            }
        }).then((response) => {
            console.log(response);
            let userDetails = response.data.userDoc;
            this.setState({
                email: userDetails.email,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                permission: userDetails.permission
            })
            console.log(userDetails.permission)
        }).catch((err) => {
            console.log(err)
            alert('error');
        })

    }

    render() {
        return (
            <div>
                <header className="main-header">
                    <a href="#" className="logo">
                        <span className="logo-mini"><b>A</b>LT</span>
                        <span className="logo-lg"><b>Admin</b>LTE</span>
                    </a>
                    <nav className="navbar navbar-static-top">
                        <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                            <span className="sr-only">Toggle navigation</span>
                        </a>
                        <div className="navbar-custom-menu">
                            <ul className="nav navbar-nav">
                                <li className="dropdown messages-menu">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <i className="fa fa-envelope-o"></i>
                                        <span className="label label-success">4</span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="header">You have 4 messages</li>
                                        <li>
                                            <ul className="menu">
                                                <li>
                                                    <a href="#">
                                                        <div className="pull-left">
                                                            <img src="img/user2-160x160.jpg" className="img-circle"
                                                                 alt="User Image"/>
                                                        </div>
                                                        <h4>
                                                            Support Team
                                                            <small><i className="fa fa-clock-o"></i> 5 mins</small>
                                                        </h4>
                                                        <p>Why not buy a new awesome theme?</p>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>

                <aside className="main-sidebar">
                    <section className="sidebar">
                        <div className="user-panel">
                            <div className="pull-left image">
                                <img src="img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                            </div>
                            <div className="pull-left info">
                                <p>{this.state.firstName} {this.state.lastName}</p>
                                <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
                            </div>
                        </div>
                        <form action="#" method="get" className="sidebar-form">
                            <div className="input-group">
                                <input type="text" name="q" className="form-control" placeholder="Search..." />
                                <span className="input-group-btn">
                                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                                </button>
                            </span>
                            </div>
                        </form>
                        <ul className="sidebar-menu" data-widget="tree">
                            <li className="header">MAIN NAVIGATION</li>
                            <li className="treeview">
                                <Link to="">
                                    <i className="fa fa-user"></i>
                                    <span>User Management</span>
                                    <span className="pull-right-container">
                                    <i className="fa fa-angle-left pull-right"></i>
                                </span>
                                </Link>
                                <ul className="treeview-menu">
                                    <li><Link to="/user">View Users</Link></li>
                                    <li><Link to="/adduser">Add User</Link></li>
                                </ul>
                            </li>
                            {
                                (this.state.permission.admin !== "false")?
                                <li>
                                <Link to="pages/widgets.html">
                                <i className="fa fa-th"></i>
                                <span>Human Resources</span>
                                </Link>
                                </li>: null
                            }
                            <li>
                                <button onClick={this.props.logout}>Logout</button>
                            </li>

                            <li>
                                <Link to="#">
                                    <i className="fa fa-th"></i>
                                    <span>Warehouse</span>
                                </Link>
                            </li>

                            {
                                (this.state.permission.supervisor || this.state.permission.admin !== "false")?
                                    <li>
                                        <Link to="#">
                                            <i className="fa fa-th"></i>
                                            <span>Product Lifecycle</span>
                                        </Link>
                                    </li>: null
                            }
                            <li>
                                <Link to="#">
                                    <i className="fa fa-th"></i>
                                    <span>Order &amp; Markerting</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <i className="fa fa-th"></i>
                                    <span>Finance &amp; Accounting</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <i className="fa fa-th"></i>
                                    <span>Customer Relationship</span>
                                </Link>
                            </li>
                            {
                                (this.state.permission.farmer !== "false") ?
                                    <li>
                                        <Link to="#">
                                            <i className="fa fa-th"></i>
                                            <span>Production</span>
                                        </Link>
                                    </li>:null
                            }
                            <li>
                                <Link to="#">
                                    <i className="fa fa-th"></i>
                                    <span>Supply Chain</span>
                                </Link>
                            </li>
                        </ul>
                    </section>
                </aside>
            </div>
        )
    }
}
