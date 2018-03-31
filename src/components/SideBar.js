import React, {Component} from 'react';
import { Link } from "react-router-dom";

export default class SideBar extends Component {

    state={
        user:""
    }

    componentDidMount(){
        let userDetails = this.props.user;
        this.setState({
            user:userDetails
        });
    }

    render(){
        return (
            <div></div>
        )
    }
}
