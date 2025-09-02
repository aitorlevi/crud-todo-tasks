import React from "react";

export default function Task({ data }) {
  return (
    <article className="bg-background-surface min-w-4/5 rounded-lg p-4">
      <h4 className="">{data.title}</h4>
      <p className="text-text-secondary">{data.description}</p>
      <div>
        <div className="bg-accent-600 line text-background-surface flex w-fit items-center rounded-xl px-2">
          <span>{data.priority}</span>
        </div>
      </div>
    </article>
  );
}
