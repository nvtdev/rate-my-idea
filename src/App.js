import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Spinner } from "@blueprintjs/core";

import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Post from "./components/Post";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Idea from "./components/Idea";
// import Content from "./components/Content";
import Footer from "./components/Footer";
import { Toaster, Intent } from "@blueprintjs/core";

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

function NonAuthRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={props => <Component {...props} {...rest} />} />
  );
}

function ShowRoute({ component: Component, items, param, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ match, ...props }) => {
        if (rest.requireAuth === true && !rest.authenticated) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }

        const item = items[match.params[param]];
        if (item) {
          return <Component item={item} {...props} match={match} {...rest} />;
        } else {
          return <h1>Not Found</h1>;
        }
      }}
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
      ideas: null,
      loading: true,
      redirectHome: false,
      userInfoLoaded: false
    };
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged(user => {
      this.setState({ userInfoLoaded: true });
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
          currentUser: user
        });
      } else
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

  addIdea(username, title, description, tags) {
    const ideas = { ...this.state.ideas };
    const id = Date.now();
    ideas[id] = {
      id: id,
      username: username,
      title: title,
      description: description,
      tags: tags
    };
    this.setState({ ideas, redirectHome: true });
  }

  addFirebaseUser(component, toaster, username, email, password) {
    app
      .auth()
      .fetchProvidersForEmail(email)
      .then(provider => {
        if (provider.length === 0) {
          if (component == "Register") {
            // create new user
            return app
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then(user => {
                if (user && user.email) {
                  user
                    .updateProfile({
                      displayName: username
                    })
                    .then(user => {
                      this.setCurrentUser(user);
                      this.setState({
                        redirectHome: true
                      });
                    });
                }
              });
          }
        } else {
          // sign in user
          if (component == "Login")
            return app.auth().signInWithEmailAndPassword(email, password);
          else {
            toaster.show({
              intent: Intent.WARNING,
              message: "This e-mail is already in use."
            });
          }
        }
      })
      .then(user => {
        if (user && user.email) {
          console.log(this);
          this.setCurrentUser(user);
          this.setState({ redirectHome: true });
        }
      })
      .catch(error => {
        toaster.show({ intent: Intent.DANGER, message: error.message });
      });
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
    if (this.state.loading || !this.state.ideas || !this.state.userInfoLoaded)
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

    if (this.state.redirectHome) {
      this.setState({ redirectHome: false });
      return (
        <Router>
          <Redirect to="/" />
        </Router>
      );
    }

    return (
      <div>
        <Router>
          <div>
            <Navbar authenticated={this.state.authenticated} />
            <div className="container">
              <Route
                exact
                path="/"
                render={props => {
                  return <Home ideas={this.state.ideas} {...props} />;
                }}
              />
              <NonAuthRoute
                exact
                path="/login"
                component={Login}
                addFirebaseUser={this.addFirebaseUser.bind(this)}
              />
              <NonAuthRoute
                exact
                path="/register"
                component={Register}
                addFirebaseUser={this.addFirebaseUser.bind(this)}
              />
              <AuthenticatedRoute
                exact
                path="/post"
                authenticated={this.state.authenticated}
                user={this.state.currentUser}
                component={Post}
                // render={props => {
                //   return <Post addIdea={this.addIdea} {...props} />;
                // }}
                addIdea={this.addIdea}
              />
              <ShowRoute
                path="/ideas/:ideaId"
                component={Idea}
                param="ideaId"
                items={this.state.ideas}
                user={this.state.currentUser}
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
