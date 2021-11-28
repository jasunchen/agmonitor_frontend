import React from "react";
import AuthenticationButton from "./authentication-button";

class AuthNav extends React.Component {
  render() {
    return (
      <li className="nav-item nav-button">
        <AuthenticationButton />
      </li>
    );
  }
}

export default AuthNav;
