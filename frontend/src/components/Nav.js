import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
    <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
      <h1>Weather App</h1>
    </div>
  );
}
export default Nav;