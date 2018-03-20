import React, { Component } from "react";
import "./Post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.postIdea = this.postIdea.bind(this);
  }

  postIdea(event) {
    event.preventDefault();

    this.props.addIdea(
      this.usernameInput.value,
      this.titleInput.value,
      this.textInput.value
    );
  }

  render() {
    return (
      <div>
        <div className="container">
          <form
            onSubmit={event => {
              this.postIdea(event);
            }}
          >
            <div className="form-group">
              <label htmlFor="usernameInput">Username</label>
              <input
                type="text"
                className="form-control"
                id="usernameInput"
                aria-describedby="emailHelp"
                placeholder="or stay anonymous"
                ref={input => {
                  this.usernameInput = input;
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="titleInput">Title</label>
              <input
                type="text"
                className="form-control"
                id="titleInput"
                placeholder="Provide a short title"
                ref={input => {
                  this.titleInput = input;
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="textInput">Describe your idea</label>
              <textarea
                className="form-control"
                id="textInput"
                rows="3"
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
  }
}

export default Post;
