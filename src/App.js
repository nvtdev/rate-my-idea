import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/home/Home";
import About from "./components/About";
import Login from "./components/Login";
import Post from "./components/Post";
// import Content from "./components/Content";
// import Footer from "./components/Footer";

import { base } from "./base";

class App extends Component {
  constructor() {
    super();
    this.addIdea = this.addIdea.bind(this);
    this.state = {
      ideas: {}
    };
  }

  componentWillMount() {
    this.ideasRef = base.syncState("ideas", {
      context: this,
      state: "ideas"
    });
  }

  componentWillUnmount() {
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
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/post" component={Post} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
