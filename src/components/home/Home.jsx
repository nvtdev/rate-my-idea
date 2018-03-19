import React, { Component } from "react";
import Navbar from "../Navbar.jsx";
import Footer from "../Footer.jsx";
import { Link } from "react-router-dom";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container home-content">
          <Link type="button" className="btn btn-primary" to="/post">
            Post
          </Link>
          <h2>Welcome</h2>
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

export default Home;
