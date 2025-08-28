import React from "react";

export default function Task({ data }) {
  return (
    <article className="task">
      <h4>{data.title}</h4>
    </article>
  );
}
