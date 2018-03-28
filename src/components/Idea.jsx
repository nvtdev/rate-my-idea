import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Idea.css";
import { base } from "../base";
import IdeaItem from "./IdeaItem.jsx";
import StarRatingComponent from 'react-star-rating-component';
import Rating from 'react-rating';

class Idea extends Component {
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);
    this.postRating = this.postRating.bind(this);
    this.state = {
      comments: [],
      ratings: null,
      ratingOriginality: 1,
      ratingFeasibility: 1,
      ratingMarketability: 1
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

  postRating(event) {
    event.preventDefault();
    let ratings = { ...this.state.ratings },
        uniqueId = parseInt(Date.now() + "" + Math.floor(Math.random() * 1000));

    ratings[uniqueId] = {
      userId: this.props.user.uid,
      ideaId: this.props.item.id,
      originality: this.state.ratingOriginality,
      feasibility: this.state.ratingFeasibility,
      marketability: this.state.ratingMarketability
    };

    this.setState({ ratings });
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
    this.ratingRef = base.syncState("ratings", {
      context: this,
      state: "ratings",
      queries: {
        orderByChild: "ideaId",
        equalTo: this.props.item.id
      }
    });
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ [name]: nextValue });
  }

  render() {
    const idea = this.props.item,
    { ratings, ratingOriginality, ratingFeasibility, ratingMarketability } = this.state;

    // check if user submitted rating - begin
    let userSubmittedRating = false;
    if (ratings) {
      for (var key in ratings) {
        if (ratings[key].userId === this.props.user.uid)
          userSubmittedRating = true;
        }
    }
    // check if user submitted rating - end

    if (idea) {
      const author = idea.username ? idea.username : "Anonymous",
        tags = idea.tags ? idea.tags : [];

      let commentsArray = [];
      for (var key in this.state.comments)
        commentsArray.push(this.state.comments[key]);

      return (
        <div>
            <div className="row">
              <div className="col-sm-10">
                <IdeaItem idea={idea} />
              </div>
              <div className="col-sm-2">
              {ratings ? (
                <form onSubmit={event => {
                  this.postRating(event);
                }}>
                  <h4>Originality</h4>
                  <StarRatingComponent
                    name="ratingOriginality"
                    starCount={5}
                    value={ratingOriginality}
                    onStarClick={this.onStarClick.bind(this)}
                    editing={!userSubmittedRating}
                  />
                  <h4>Feasibility</h4>
                  <StarRatingComponent
                    name="ratingFeasibility"
                    starCount={5}
                    value={ratingFeasibility}
                    onStarClick={this.onStarClick.bind(this)}
                    editing={!userSubmittedRating}
                  />
                <h4>Marketability</h4>
                  <StarRatingComponent
                    name="ratingMarketability"
                    starCount={5}
                    value={ratingMarketability}
                    onStarClick={this.onStarClick.bind(this)}
                    editing={!userSubmittedRating}
                  />
                  { !userSubmittedRating ? (
                    <button type="submit" className="btn btn-outline-info">Submit rating</button>
                  ) : (
                    <div className="alert alert-success" role="alert">
                      <i className="fas fa-check"></i> You've submitted your rating!
                    </div>
                  ) }
                </form>
              ) : ''}
              </div>
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
