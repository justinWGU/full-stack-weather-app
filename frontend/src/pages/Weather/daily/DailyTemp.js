import React from "react";


export default function DailyTemp({ high, low}) {
  return (
    <p>{high} | {low}</p>
  );
}