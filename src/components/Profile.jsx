import React, { Component } from "react";
import { Link } from "react-router-dom";
import IdeaItem from "./IdeaItem.jsx";

class Profile extends Component {
  render() {
    const { ideas } = this.props;
    const { user } = this.props;

    const ideasArray = [];
    for (var key in ideas) {
      if (ideas[key].userId === user.uid)
        ideasArray.push(ideas[key]);
    }

    return (
      <div>
        <h5>Ideas submitted by you:</h5>
          {ideasArray.map(idea => {
            return <IdeaItem idea={idea} />;
          })}
      </div>
    );
  }
}

export default Profile;
