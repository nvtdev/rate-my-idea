import React, { Component } from "react";
import List from "./parts/List";
import { Link } from "react-router-dom";
import "./Home.css";

class Home extends Component {
  render() {
    const { ideas } = this.props;
    const ideasIds = Object.keys(ideas);

    return (
      <div>
        <Link type="button" className="btn btn-primary" to="/post">
          Post
        </Link>
        {/* <List /> */}
        {ideas.map(id => {
          const idea = ideas[id];
          return (
            <div key={id}>
              <h5>
                <Link to={`/idea/${id}`}>{idea.title}</Link>
              </h5>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Home;
