import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import IdeaItem from "./IdeaItem.jsx";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { tags: [] };
  }

  render() {
    const { ideas } = this.props;
    const ideasIds = Object.keys(ideas);
    const ideasArray = [];
    for (var key in ideas) {
      ideasArray.push(ideas[key]);
    }

    return (
      <div className="row">
        <div className="col-sm-10">
          {ideasArray.map(idea => {
            return <IdeaItem idea={idea} addFilter={this.addFilter.bind(this)} />;
          })}
        </div>
        <div className="col-sm-2"></div>
      </div>
    );
  }

  addFilter(tag) {
    let tags = this.state.tags;

    if (!tags.includes(tag))
      tags.push(tag);

    console.log(this.state);
  }
}

export default Home;
