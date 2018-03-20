import React, { Component } from "react";
import "./Post.css";

class Post extends Component {

  render() {
    return (
      <div>
        <div className="container">
          <form>
            <div className="form-group">
              <label htmlFor="usernameInput">Username</label>
              <input
                type="text"
                className="form-control"
                id="usernameInput"
                aria-describedby="emailHelp"
                placeholder="or stay anonymous"
              />
            </div>
            <div className="form-group">
              <label htmlFor="titleInput">Title</label>
              <input
                type="tex"
                className="form-control"
                id="titleInput"
                placeholder="Provide a short title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="textInput">Describe your idea</label>
              <textarea className="form-control" id="textInput" rows="3" />
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
