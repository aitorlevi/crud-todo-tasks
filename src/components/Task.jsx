import React from "react";

export default function Task({ data }) {
  return (
    <div className="task">
      <h4>{data.title}</h4>
    </div>
  );
}
