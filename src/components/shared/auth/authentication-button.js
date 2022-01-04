import React from "react";

import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import  {withRouter } from "react-router-dom";

import { withAuth0 } from "@auth0/auth0-react";
import {Menu, Dropdown} from 'antd'
import axios from "axios";

class AuthenticationButton extends React.Component {
  componentDidMount() {
    const { user } = this.props.auth0;
    if (user) {
      axios.post('/registerUser', {email: user.email})
        .then(res => {
          console.log(res.data.detail)
        })
    }
  }

  render() {
    const { isAuthenticated, logout, user } = this.props.auth0;
    console.log(user)
    const menu = (
      <Menu>
        <Menu.Item><span onClick={() => {
          this.props.history.push('/profile')
        }}>Edit Profile</span></Menu.Item>
        <Menu.Item><span onClick={() =>
          logout({
            returnTo: window.location.origin,
          })
        }>Log out</span></Menu.Item>
      </Menu>
    )
    return <>{!isAuthenticated ? <LoginButton /> :(<div>
      <Dropdown overlay={menu}>
        <span>{user.nickname}</span>
      </Dropdown>
    </div>)}</> ;
  }
}

export default withAuth0(withRouter(AuthenticationButton));
