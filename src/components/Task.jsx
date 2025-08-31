import React from "react";

export default function Task({ data }) {
  return (
    <article className="bg-surface min-w-4/5 rounded-lg p-4">
      <h4 className="">{data.title}</h4>
      <p className="text-secondary-text">{data.description}</p>
      <span className="text-secondary-accent">{data.priority}</span>
    </article>
  );
}
