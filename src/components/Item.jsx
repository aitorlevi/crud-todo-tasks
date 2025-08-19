import React from "react";

export default function Item({ title, description, priority }) {
  return (
    <article className="item">
      <h3>{title}</h3>
      <p>{description}</p>
      <span className={`priority priority-${priority}`}>{priority}</span>
    </article>
  );
}
