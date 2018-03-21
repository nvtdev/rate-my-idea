import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Idea from "./Idea.jsx";

class Home extends Component {
  render() {
    const { ideas } = this.props;
    const ideasIds = Object.keys(ideas);
    const ideasArray = [];
    for (var key in ideas) {
      ideasArray.push(ideas[key]);
    }
    console.log(ideasArray);

    return (
      <div>
        {ideasArray.map(idea => {
          return (
            // <div key={idea.id}>
            //   <h5>
            //     <Link to={`/idea/${idea.id}`}>{idea.title}</Link>
            //   </h5>
            // </div>
            <Idea idea={idea} />
          );
        })}
      </div>
    );
  }
}

export default Home;
