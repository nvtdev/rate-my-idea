import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import IdeaItem from "./IdeaItem.jsx";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      ideas: this.props.ideas,
      originalIdeas: this.props.ideas
    };
  }

  render() {
    const { ideas } = this.state,
          { tags } = this.state,
          ideasIds = Object.keys(ideas);

    let ideasArray = this.props.objectToArray(ideas);

    return (
      <div className="row">
        <div className="col-sm-10">
          {ideasArray.map(idea => {
            return <IdeaItem idea={idea} addFilter={this.addFilter.bind(this)} />;
          })}
        </div>
        <div className="col-sm-2">
          {tags.map(tag => {
            return <span data-toggle="tooltip" data-placement="bottom" title="Click to remove filter" onClick={ (e) => this.removeFilter(tag) } className="badge badge-dark tag-badge">{tag}</span>;
          })}
        </div>
      </div>
    );
  }

  addFilter(tag) {
    let tags = this.state.tags;

    if (!tags.includes(tag))
      tags.push(tag);

    this.setState({ tags });
    this.filterIdeas();
  }

  removeFilter(tag) {
    let {tags} = this.state,
        index = tags.indexOf(tag);

    if (index > -1)
          tags.splice(index, 1);

    this.setState({ tags });
    this.filterIdeas();
  }

  filterIdeas() {
    let filteredIdeas = [],
        ideas = this.props.objectToArray(this.state.originalIdeas),
        { tags } = this.state;

    if (tags.length > 0) {
      for (let idea of ideas) {
        let ideaAdded = false;
        if (idea.tags) {
          for (let tag of idea.tags) {
            if (tags.indexOf(tag.text) > -1
                  && !ideaAdded)
            {
              filteredIdeas.push(idea);
              ideaAdded = true;
            }
          }
        }
      }
      this.setState({ ideas: filteredIdeas });
    } else
      this.setState({ ideas: this.state.originalIdeas });
  }
}

export default Home;
