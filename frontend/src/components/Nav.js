import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div>
    <nav>
        <ul>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
      <h1>Weather App</h1>
    </div>
  );
}