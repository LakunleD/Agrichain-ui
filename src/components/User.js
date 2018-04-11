import React, {Component} from 'react';

import axios from 'axios';
import values from '../values/values.json';

export default class User extends Component {

    state={
        users:[]
    }


    loadUsers(){
        axios({
            url: values.URL+'/users',
            method: "GET"
        }).then((response) => {
                let users = response.data;

                console.log(users);

                this.setState({users})
            })
            .catch((err) => {
            })
    }
    componentDidMount(){
        this.loadUsers()
    }


    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">User Details</h3>
                                </div>
                                <div className="box-body">
                                    <table id="table" className="table table-bordered table-hover">
                                        <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Firstname</th>
                                            <th>Lastname</th>
                                            <th>Role</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.users.map((user) =>{
                                                    return(
                                                        (user !== undefined)?
                                                            <tr key={user._id}>
                                                                <td>{user.email}</td>
                                                                <td>{user.firstName}</td>
                                                                <td>{user.lastName}</td>
                                                                <td>{user.farmer}</td>
                                                                <td>
                                                                    Farmer: {user.permission.farmer}<br/>
                                                                    Supervisor: {user.permission.supervisor}<br/>
                                                                    Admin: {user.permission.admin}<br/>
                                                                </td>
                                                            </tr>: null
                                                        )
                                                })
                                            }

                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <th>Email</th>
                                            <th>Firstname</th>
                                            <th>Lastname</th>
                                            <th>Role</th>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

