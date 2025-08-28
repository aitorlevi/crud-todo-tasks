import React from "react";

export default function Task({ data }) {
  return (
    <article className="task">
      <h4 className="task__title">{data.title}</h4>
    </article>
  );
}
