import React, { Component } from "react";
import "./Post.css";
import { WithContext as ReactTags } from "react-tag-input";

class Post extends Component {
  constructor(props) {
    super(props);
    this.postIdea = this.postIdea.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.state = { tags: [] };
  }

  postIdea(event) {
    event.preventDefault();

    this.props.addIdea(
      this.usernameInput.value,
      this.titleInput.value,
      this.textInput.value,
      this.state.tags
    );
  }

  handleDelete(i) {
    let tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({ tags: tags });
  }

  handleAddition(tag) {
    let tags = this.state.tags;
    if (tags.length == 5) return;
    tags.push({
      id: tags.length + 1,
      text: tag
    });
    this.setState({ tags: tags });
  }

  handleDrag(tag, currPos, newPos) {
    let tags = this.state.tags;

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: tags });
  }

  render() {
    const { tags } = this.state;

    return (
      <div>
        <div className="container">
          <form
            onSubmit={event => {
              this.postIdea(event);
            }}
          >
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
                placeholder="Describe your idea"
                ref={input => {
                  this.textInput = input;
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="textInput">Tags (up to 5)</label>
              <ReactTags
                tags={tags}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleDrag={this.handleDrag}
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
