import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import "./Register.css";
import { app, facebookProvider } from "../base";
import { Toaster, Intent } from "@blueprintjs/core";

class Register extends Component {
  constructor(props) {
    super(props);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
    this.state = {
      redirect: false
    };
  }

  authWithEmailPassword(event) {
    event.preventDefault();

    const email = this.emailInput.value,
      username = this.usernameInput.value,
      password = this.passwordInput.value;

    if (!username || username.length == 0) {
      this.toaster.show({
        intent: Intent.WARNING,
        message: "Please enter a username."
      });
      return;
    }

    this.props.addFirebaseUser(
      "Register",
      this.toaster,
      username,
      email,
      password
    );
  }

  render() {
    if (this.state.redirect) return <Redirect to="/" />;

    return (
      <form
        className="form-signin"
        onSubmit={event => {
          this.authWithEmailPassword(event);
        }}
        ref={form => {
          this.loginForm = form;
        }}
      >
        <Toaster
          ref={element => {
            this.toaster = element;
          }}
        />
        <h1 className="h3 mb-3 font-weight-normal login-title">
          Please register
        </h1>
        <label htmlFor="inputUsername" className="sr-only">
          Username
        </label>
        <input
          type="text"
          id="inputUsername"
          className="form-control"
          placeholder="Username"
          required=""
          autoFocus=""
          ref={input => {
            this.usernameInput = input;
          }}
        />
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required=""
          autoFocus=""
          ref={input => {
            this.emailInput = input;
          }}
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required=""
          ref={input => {
            this.passwordInput = input;
          }}
        />
        <button
          className="btn btn-lg btn-outline-primary btn-block"
          type="submit"
        >
          Register
        </button>
      </form>
    );
  }
}

export default Register;
