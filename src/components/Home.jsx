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

    let ideasArray = this.props.objectToArray(ideas),
        trendingTags = {};

    for (let idea of ideasArray) {
      for (let tag of idea.tags) {
        // let tagIndex = trendingTags.indexOf(tag.text);
        // if (tagIndex < 0) {
        //   trendingTags.push(tag.text);
        //   trendingTags.push(1);
        // } else
        //   trendingTags[tagIndex + 1] += 1;

        // if (!trendingTags[tag.text])
        //   trendingTags[tag.text] = 1;
        // else
        //   trendingTags[tag.text] += 1;

        if (trendingTags[tag.text])
          trendingTags[tag.text] += 1;
        else
          trendingTags[tag.text] = 1;
      }
    }

    trendingTags = Object.keys(trendingTags).sort(function(a,b){return trendingTags[b]-trendingTags[a] });
    let counter = trendingTags.length;

    return (
      <div className="row home-container">
        <div className="col-sm-10">
          {ideasArray.map(idea => {
            return <IdeaItem idea={idea} addFilter={this.addFilter.bind(this)} />;
          })}
        </div>
        <div className="col-sm-2 home-sidebar">
          <div className="trending-tags">
            <h5>Explore tags</h5>
            {trendingTags.map(trendingTag => {
              console.log(counter--);
              return <span className="trending-tag" style={{fontSize: 20+counter--}} onClick={ (e) => this.addFilter(trendingTag) }>{trendingTag}</span>;
            })}
          </div>

          <div className="filter-tags">
            {tags.map(tag => {
              return <span data-toggle="tooltip" data-placement="bottom" title="Click to remove filter" onClick={ (e) => this.removeFilter(tag) } className="badge badge-dark tag-badge">{tag}</span>;
            })}
          </div>
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
