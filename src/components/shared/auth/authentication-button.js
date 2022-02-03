import React from "react";

import LoginButton from "./login-button";
import  {withRouter } from "react-router-dom";

import { withAuth0 } from "@auth0/auth0-react";
import {Menu, Dropdown} from 'antd'
import axios from "axios";

class AuthenticationButton extends React.Component {
  componentDidMount() {
    const { user } = this.props.auth0;
    if (user) {
      let server = "http://0.0.0.0:8000"
      if (process.env.REACT_APP_REMOTE === "1") { 
          server = "https://agmonitor-pina-colada-back.herokuapp.com"
      }

      let requestUrl = `${server}/registerUser`

      fetch(requestUrl, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },              
          body: JSON.stringify({
            "email": user.email
          })
      })
      .then(response => response.json()) 
      .then(data => {
          console.log(data);
      })
      .catch((error) => console.log("Error: " + error))
    }
  }

  render() {
    const { isAuthenticated, logout, user } = this.props.auth0;

    const menu = (
      <Menu>
        <Menu.Item><span onClick={() =>
          logout({
            returnTo: window.location.origin,
          })
        }>Log out</span></Menu.Item>
      </Menu>
    )
    return <>{!isAuthenticated ? <LoginButton /> :(<div>
      <Dropdown  overlay={menu}>
        <span className="dropdown-content">{user.nickname}</span>
      </Dropdown>
    </div>)}</> ;
  }
}

export default withAuth0(withRouter(AuthenticationButton));
