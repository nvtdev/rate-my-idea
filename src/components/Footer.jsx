import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <span className="text-muted">
            RateMyIdea &#169; {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    );
  }
}

export default Footer;
