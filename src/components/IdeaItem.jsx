import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./IdeaItem.css";
import { base } from "../base";

class IdeaItem extends Component {
  constructor(props) {
    super(props);
    this.vote = this.vote.bind(this);
    this.state = {
      idea: {}
    };
  }

  vote(direction) {
    console.log(direction);
  }

  componentWillMount() {
    this.ideaRef = base.syncState("ideas", {
      context: this,
      state: "idea",
      queries: {
        orderByChild: "id",
        equalTo: this.props.idea.id
      },
      then: console.log(this.state.idea)
    });
  }

  render() {
    const { idea } = this.state.idea;

    if (!idea) return "";

    const author = idea.username ? idea.username : "Anonymous",
      tags = idea.tags ? idea.tags : [];

    return (
      <div className="idea">
        <i
          onClick={e => this.vote("up")}
          className="fas score-arrow fa-angle-up"
        />
        <i
          onClick={e => this.vote("down")}
          className="fas score-arrow fa-angle-down"
        />
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
