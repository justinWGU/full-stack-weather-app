import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Nav() {
  return (
    <div>
    <nav>
        <ul>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
      <Outlet></Outlet>
    </div>
  );
}