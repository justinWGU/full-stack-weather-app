import React from "react";


export default function UVRating({number, description}) {
  return (
    <p>{number&& number} {description&& description}</p>
  );
}