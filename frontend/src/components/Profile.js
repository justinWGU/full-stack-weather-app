import React from "react";

export default function Profile({ resetToken }) {
  return (
    <div>
    <h1>Profile</h1>
    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700" onClick={resetToken}>Log out</button>
    </div>
  )
}