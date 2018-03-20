import React, { Component } from "react";
import List from "./parts/List";
import { Link } from "react-router-dom";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    const { ideas } = this.props;
    console.log(ideas);
  }

  render() {
    return (
      <div>
        <div className="container home-content">
          <Link type="button" className="btn btn-primary" to="/post">
            Post
          </Link>
          <List/>
        </div>
      </div>
    );
  }
}

export default Home;
