import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import About from "./components/About.jsx";
import Login from "./components/Login.jsx";
// import Content from "./components/Content";
// import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
