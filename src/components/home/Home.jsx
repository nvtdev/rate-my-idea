import React, { Component } from "react";
import List from "./parts/List";
import { Link } from "react-router-dom";
import "./Home.css";

class Home extends Component {
  render() {
    const { ideas } = this.props;
    const ideasIds = Object.keys(ideas);
    const ideasArray = [];
    for (var key in ideas) {
      ideasArray.push(ideas[key]);
    }
    console.log(ideasArray);

    return (
      <div>
        <Link type="button" className="btn btn-primary" to="/post">
          Post
        </Link>
        {/* <List /> */}
        {
          ideasArray.map(idea => {
            return (
              <div key={idea.id}>
                <h5>
                  <Link to={`/idea/${idea.id}`}>{idea.title}</Link>
                </h5>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Home;
