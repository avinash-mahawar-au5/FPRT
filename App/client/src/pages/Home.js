import React, { Component } from "react";
import AuthForm from "../components/AuthForm";
import { connect } from "react-redux";
// import "antd/dist/antd.css";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { signIn } from "../actions/app";
import { signUp } from "../actions/app";
import { Row, Col, Button } from "antd";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signMode: "menu",
    };

    this.getAuthComponent = this.getAuthComponent.bind(this);
    this.setMenuMode = this.setMenuMode.bind(this);
    this.setLoginMode = this.setLoginMode.bind(this);
    this.setSignupMode = this.setSignupMode.bind(this);
  }

  componentDidMount() {
    if (this.props.isLogged) this.props.history.push(`/u/${this.props.user}`);
  }

  componentDidUpdate() {
    if (this.props.isLogged) this.props.history.push(`/u/${this.props.user}`);
  }

  setLoginMode() {
    this.setState(() => ({ signMode: "login" }));
  }

  setMenuMode() {
    this.setState(() => ({ signMode: "menu" }));
  }

  setSignupMode() {
    this.setState(() => ({ signMode: "signup" }));
  }

  getAuthComponent() {
    const signMode = this.state.signMode;

    switch (signMode) {
      case "signup":
        return (
          <AuthForm
            type="signup"
            backMethod={this.setMenuMode}
            onSuccess={this.props.signUp}
          />
        );
      case "login":
        return (
          <AuthForm
            type="login"
            backMethod={this.setMenuMode}
            onSuccess={this.props.signIn}
          />
        );
    }
  }

  render() {
    return (
      <div className="home ">
        <div className="row h-100 m-0 p-0">
          <div className="col-8 d-none  d-md-flex flex-column justify-content-end pl-5 home__left"></div>
          <div className="col-12 col-md-4 bg-white home__right d-flex flex-column justify-content-center">
            <div className="row justify-content-center"></div>
            <div className="row justify-content-center my-4"></div>
            <div className="row pr-md-3">
              <div className="col-12 px-4">
                <div className="card border-0 rounded-0">
                  <div className="card-body">
                    {this.state.signMode === "menu" && (
                      <div>
                        <button
                          className="btn btn-outline-primary btn-block rounded-pill"
                          onClick={this.setSignupMode}
                        >
                          Sign Up
                        </button>
                        <button
                          className="btn btn-primary btn-block text-light rounded-pill"
                          onClick={this.setLoginMode}
                        >
                          Log In
                        </button>
                      </div>
                    )}
                    {this.state.signMode !== "menu" && (
                      <>{this.getAuthComponent()}</>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const stateToProps = (state) =>
  // console.log("state", state),
  ({
    isLogged: state.app.logged.isLogged,
    user: state.app.logged.username,
  });

const dispatchToProps = (dispatch) => ({
  signIn: (value) => dispatch(signIn(value)),
  signUp: (value) => dispatch(signUp(value)),
});

export default connect(stateToProps, dispatchToProps)(Home);
