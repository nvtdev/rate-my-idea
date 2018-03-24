import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Idea.css";
import { base } from "../base";

class Idea extends Component {
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);
    this.state = {
      comments: []
    };
  }

  addComment(event) {
    event.preventDefault();

    let comments = { ...this.state.comments },
      uniqueId = parseInt(Date.now() + "" + Math.floor(Math.random() * 1000));

    comments[uniqueId] = {
      author: this.props.user.displayName,
      text: this.textInput.value,
      ideaId: this.props.item.id,
      date: new Date()
    };

    this.setState({ comments });
  }

  componentWillMount() {
    this.commentsRef = base.syncState("comments", {
      context: this,
      state: "comments",
      queries: {
        orderByChild: "ideaId",
        equalTo: this.props.item.id
      }
    });
  }

  render() {
    const idea = this.props.item;

    if (idea) {
      const author = idea.username ? idea.username : "Anonymous",
        tags = idea.tags ? idea.tags : [];

      let commentsArray = [];
      for (var key in this.state.comments)
        commentsArray.push(this.state.comments[key]);

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
            {commentsArray.map(comment => {
              return (
                <div className="comment">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-text">{comment.text}</span>
                </div>
              );
            })}
            {this.props.user ? (
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
            ) : (
              ""
            )}
          </div>
        </div>
      );
    } else return <div />;
  }
}

export default Idea;
