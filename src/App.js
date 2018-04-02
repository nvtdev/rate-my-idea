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
      currentUserIdeas: null,
      currentUserIdeasLoaded: false,
      loading: true,
      redirectHome: false,
      userInfoLoaded: false
    };
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged(user => {
      this.setState({ userInfoLoaded: true });
      console.log(user);
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

        let query = {};
        if (!user) {
          query = {
            orderByChild: "visibility",
            equalTo: "a"
          };
          this.setState({ currentUserIdeasLoaded: true });
        } else {
          if (user.providerData[0].providerId === 'password')
            query = {
              orderByChild: "visibility",
              endAt: "b"
            };

            this.currentUserIdeasRef = base.syncState("ideas", {
              context: this,
              state: "currentUserIdeas",
              queries: {
                orderByChild: "userId",
                equalTo: user.uid
              },
              then() {
                this.setState({ currentUserIdeasLoaded: true });
              }
            });
        }

        this.ideasRef = base.syncState("ideas", {
          context: this,
          state: "ideas",
          queries: query
        });
    });
  }

  componentWillUnmount() {
    this.removeAuthListener();
    base.removeBinding(this.ideasRef);
  }

  addIdea(title, description, visibility, tags) {
    const ideas = { ...this.state.ideas };
    const id = Date.now();
    ideas[id] = {
      id: id,
      userId: this.state.currentUser.uid,
      username: this.state.currentUser.displayName,
      title: title,
      description: description,
      visibility: visibility,
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
          this.setCurrentUser(user);
          this.setState({ redirectHome: true });
        }
      })
      .catch(error => {
        toaster.show({ intent: Intent.DANGER, message: error.message });
      });
  }

  objectToArray(obj) {
    let arr = [];
    for (var key in obj) {
      arr.push(obj[key]);
    }
    return arr;
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
    if (this.state.loading || !this.state.ideas || !this.state.userInfoLoaded || !this.state.currentUserIdeasLoaded)
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

    // merge all visible ideas with ideas submitted by user
    const mergedIdeas = { ...this.state.ideas };
    for (var key in this.state.currentUserIdeas) {
      if (!(key in mergedIdeas))
        mergedIdeas[key] = this.state.currentUserIdeas[key];
    }

    return (
      <div>
        <Router>
          <div>
            <Navbar
              user={this.state.currentUser}
              authenticated={this.state.authenticated} />
            <div className="container">
              <Route
                exact
                path="/"
                render={props => {
                  return <Home objectToArray={this.objectToArray} ideas={mergedIdeas} {...props} />;
                }}
              />
              <NonAuthRoute
                exact
                path="/login"
                component={Login}
                setCurrentUser={this.setCurrentUser.bind(this)}
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
                addIdea={this.addIdea}
              />
              <ShowRoute
                path="/ideas/:ideaId"
                component={Idea}
                param="ideaId"
                items={mergedIdeas}
                user={this.state.currentUser}
              />
              <AuthenticatedRoute
                exact
                path="/profile"
                component={Profile}
                user={this.state.currentUser}
                ideas={mergedIdeas}
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
