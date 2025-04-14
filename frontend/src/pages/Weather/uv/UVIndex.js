import React from "react";
import UVRating from "./UVRating";


export default function UVIndex() {
  return (
    <div className="row-start-4 col-start-4 col-end-5 border-2 border-red-600">
      <h3>UV Index</h3>
      <UVRating number={0} description={"Low"}></UVRating>
    </div>
  );
}