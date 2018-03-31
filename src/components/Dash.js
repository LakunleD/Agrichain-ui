import React, {Component} from 'react';

import axios from 'axios';

import Header from './Header';
import SideBar from './SideBar';
import Content from './Content';
import Dashboard from './Dashboard'
import User from './User';
import AddUser from './AddUser';

export default class Dash extends Component {

    constructor() {
        super();

        this.state={
            email:'',
            firstName:'',
            lastName:'',
            permission:''
        }
    }


    render() {
        return (
            <div className="hold-transition skin-blue sidebar-mini">
                <Header token={this.props.token} logout={this.props.logout}/>
                {/*<SideBar user={this.state.user}/>*/}
            </div>
        )
    }
}
