import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Spinner } from "@blueprintjs/core";

import Home from "./components/home/Home";
import About from "./components/About";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Post from "./components/Post";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
// import Content from "./components/Content";
import Footer from "./components/Footer";

import { app, base } from "./base";

function AuthenticatedRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

class App extends Component {
  constructor() {
    super();
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.addIdea = this.addIdea.bind(this);
    this.state = {
      authenticated: false,
      currentUser: null,
      ideas: {},
      loading: true
    };
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged(user => {
      if (user)
        this.setState({
          authenticated: true,
          loading: false,
          currentUser: user
        });
      else
        this.setState({
          authenticated: false,
          loading: false,
          currentUser: null
        });
    });
    this.ideasRef = base.syncState("ideas", {
      context: this,
      state: "ideas"
    });
  }

  componentWillUnmount() {
    this.removeAuthListener();
    base.removeBinding(this.ideasRef);
  }

  addIdea(username, title, description) {
    const ideas = { ...this.state.ideas };
    const id = Date.now();
    ideas[id] = {
      id: id,
      username: username,
      title: title,
      description: description
    };
    this.setState({ ideas });
  }

  setCurrentUser(user) {
    if (user)
      this.setState({
        currentUser: user,
        authenticated: true
      });
    else
      this.setState({
        currentUser: null,
        authenticated: false
      });
  }

  render() {
    if (this.state.loading)
      return (
        <div
          style={{
            textAlign: "center",
            position: "absolute",
            top: "25%",
            left: "50%"
          }}
        >
          <h3>Loading</h3>
          <Spinner />
        </div>
      );

    return (
      <div>
        <Router>
          <div>
            <Navbar authenticated={this.state.authenticated} />
            <div className="container">
              <Route exact path="/" component={Home} ideas={this.state.ideas} />
              <Route
                exact
                path="/login"
                render={props => {
                  return (
                    <Login setCurrentUser={this.setCurrentUser} {...props} />
                  );
                }}
              />
              <Route
                exact
                path="/post"
                render={props => {
                  return <Post addIdea={this.addIdea} {...props} />;
                }}
              />
              <AuthenticatedRoute
                exact
                path="/profile"
                component={Profile}
                authenticated={this.state.authenticated}
              />
              <Route exact path="/logout" component={Logout} />
            </div>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
