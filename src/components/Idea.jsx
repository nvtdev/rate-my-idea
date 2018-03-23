import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Idea.css";

class Idea extends Component {
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);
    this.state = {
      comments: null
    };
  }

  addComment(event) {
    event.preventDefault();
    // this.state
  }

  render() {
    const idea = this.props.item;

    if (idea) {
      const author = idea.username ? idea.username : "Anonymous",
        tags = idea.tags ? idea.tags : [];

      return (
        <div>
          <div className="idea">
            <span className="idea-score">{idea.score}</span>
            <h4 className="idea-title">
              <Link to={`/ideas/${idea.id}`}>{idea.title}</Link>
            </h4>{" "}
            <span>by {author}</span>
            <div className="idea-tags">
              {tags.map(tag => {
                return <span className="badge badge-dark">{tag.text}</span>;
              })}
            </div>
            <div className="idea-description">{idea.description}</div>
          </div>
          <div className="comments">
            <form
              onSubmit={event => {
                this.addComment(event);
              }}
            >
              <div className="form-group">
                <label htmlFor="textInput">Add a comment</label>
                <textarea
                  className="form-control"
                  id="textInput"
                  rows="2"
                  ref={input => {
                    this.textInput = input;
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-post-idea">
                Submit
              </button>
            </form>
          </div>
        </div>
      );
    } else return <div />;
  }
}

export default Idea;
