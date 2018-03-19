import React, { Component } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import "./Login.css";

class Login extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h2>Login</h2>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
