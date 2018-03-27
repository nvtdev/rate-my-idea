import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import IdeaItem from "./IdeaItem.jsx";

class Home extends Component {
  render() {
    const { ideas } = this.props;
    const ideasIds = Object.keys(ideas);
    const ideasArray = [];
    for (var key in ideas) {
      ideasArray.push(ideas[key]);
    }

    return (
      <div>
        {ideasArray.map(idea => {
          return <IdeaItem idea={idea} />;
        })}
      </div>
    );
  }
}

export default Home;
