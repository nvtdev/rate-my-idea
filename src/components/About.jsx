import React, { Component } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import "./About.css";

class About extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h2>About Page</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
            expedita nisi saepe exercitationem officia, assumenda sunt
            doloremque aliquam odio quidem deleniti quis animi officiis nihil
            voluptatibus sint perspiciatis nulla eveniet?
          </p>
        </div>
        <Footer />
      </div>
    );
  }
}

export default About;
