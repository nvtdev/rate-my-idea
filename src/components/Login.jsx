import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";
import { app, facebookProvider } from "../base";
import { Toaster, Intent } from "@blueprintjs/core";

class Login extends Component {
  constructor(props) {
    super(props);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
    this.authWithFacebook = this.authWithFacebook.bind(this);
    this.state = {
      redirect: false
    };
  }

  authWithEmailPassword(event) {
    event.preventDefault();
    // console.table([{
    //   email: this.emailInput.value,
    //   password: this.passwordInput.value
    // }]);

    const email = this.emailInput.value,
      password = this.passwordInput.value;

    app
      .auth()
      .fetchProvidersForEmail(email)
      .then(provider => {
        if (provider.length === 0) {
          // create new user
          return app.auth().createUserWithEmailAndPassword(email, password);
        } else if (provider.indexOf("password") === -1) {
          // they used facebook
          this.toaster.show({
            intent: Intent.WARNING,
            message: "You already use this email for login with Facebook."
          });
          this.loginForm.reset();
        } else {
          // sign in user
          return app.auth().signInWithEmailAndPassword(email, password);
        }
      })
      .then(user => {
        if (user && user.email) {
          this.loginForm.reset();
          this.props.setCurrentUser(user);
          this.setState({ redirect: true });
        }
      })
      .catch(error => {
        this.toaster.show({ intent: Intent.DANGER, message: error.message });
      });
  }

  authWithFacebook(event) {
    event.preventDefault();
    app
      .auth()
      .signInWithPopup(facebookProvider)
      .then((user, error) => {
        if (error)
          this.toaster.show({
            intent: Intent.DANGER,
            message: "Unable to sign in with Facebook"
          });
        else {
          this.setState({ redirect: true });
          this.props.setCurrentUser(user);
        }
      });
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
          Please sign in
        </h1>
        <div className="alert alert-info" role="alert">
          Note: if you don't have an account already, this form will create one
          for you.
        </div>
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
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button
          className="btn btn-lg btn-outline-primary btn-block"
          type="submit"
        >
          Sign in
        </button>
        <hr />
        <button
          className="btn btn-lg btn-primary btn-block"
          onClick={event => {
            this.authWithFacebook(event);
          }}
        >
          Connect with Facebook
        </button>
      </form>
    );
  }
}

export default Login;
