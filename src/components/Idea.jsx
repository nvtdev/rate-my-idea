import React, { Component } from "react";
import { Link } from "react-router-dom";

class Idea extends Component {
  render() {
    const { idea } = this.props;

    return (
      <div>
        <h4>{idea.title}</h4>
        <p>{idea.description}</p>
      </div>
    );
  }
}

export default Idea;
