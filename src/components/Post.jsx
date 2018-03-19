import React, { Component } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import "./Post.css";

class Post extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <form>
            <div className="form-group">
              <label for="usernameInput">Username</label>
              <input
                type="text"
                className="form-control"
                id="usernameInput"
                aria-describedby="emailHelp"
                placeholder="or stay anonymous"
              />
            </div>
            <div className="form-group">
              <label for="titleInput">Title</label>
              <input
                type="tex"
                className="form-control"
                id="titleInput"
                placeholder="Provide a short title"
              />
            </div>
            <div className="form-group">
              <label for="textInput">Describe your idea</label>
              <textarea class="form-control" id="textInput" rows="3" />
            </div>
            <button type="submit" className="btn btn-primary btn-post-idea">
              Submit
            </button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Post;
