import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./IdeaItem.css";

class IdeaItem extends Component {
  render() {
    const { idea } = this.props,
      author = idea.username ? idea.username : "Anonymous",
      tags = idea.tags ? idea.tags : [];

    return (
      <div className="idea">
        <span className="idea-score">{idea.score}</span>
        <h4 className="idea-title">
          <Link to={`/ideas/${idea.id}`} idea={idea}>
            {idea.title}
          </Link>
        </h4>{" "}
        <span>by {author}</span>
        <div className="idea-tags">
          {tags.map(tag => {
            return <span className="badge badge-dark">{tag.text}</span>;
          })}
        </div>
        <div className="idea-description">{idea.description}</div>
      </div>
    );
  }
}

export default IdeaItem;
