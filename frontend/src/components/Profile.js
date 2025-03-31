import React from "react";

export default function Profile({ resetToken }) {
  return (
    <div>
    <h1>Profile</h1>
    <button className="btn btn-primary" onClick={resetToken}>Log out</button>
    </div>
  )
}