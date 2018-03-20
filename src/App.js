import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Spinner } from '@blueprintjs/core';

import Home from "./components/home/Home";
import About from "./components/About";
import Login from "./components/Login";
import Post from "./components/Post";
import Navbar from "./components/Navbar";
// import Content from "./components/Content";
import Footer from "./components/Footer";

import { app, base } from "./base";

class App extends Component {
  constructor() {
    super();
    this.addIdea = this.addIdea.bind(this);
    this.state = {
      ideas: {},
      authenticated: false,
      loading: true
    };
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) this.setState({ authenticated: true, loading: false });
      else this.setState({ authenticated: false, loading: false });
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

  addIdea(title, description) {
    const ideas = { ...this.state.ideas };
    const id = Date.now();
    ideas[id] = {
      id: id,
      title: title,
      description: description
    };
    this.setState({ideas});
  }

  render() {
    if (this.state.loading)
      return (
        <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
          <h3>Loading</h3>
          <Spinner />
          </div>
      )

    return (
      <div>
        <Router>
          <div>
            <Navbar authenticated={this.state.authenticated} />
            <Route exact path="/" component={Home} 
              ideas={this.state.ideas} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/post" component={Post} />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
