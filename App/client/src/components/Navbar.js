import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../actions/app";
import Logo from "../assets/images/trellologo.jpg";
import Auth from "./Auth";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import '../styles/Navbar.css'

class Navbar extends Component {
  render() {
    return (
      <div className="navBar bg-danger">
        <AppBar position="static">
          <h3>Hello</h3>
          <Logo />
        </AppBar>
      </div>
    );
  }
}
export default Navbar;
