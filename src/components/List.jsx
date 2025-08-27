import React from "react";
import Item from "./item.jsx";
import Task from "./Task.jsx";

export default function List({ data }) {
  return (
    <div className="list">
      <h2>{data.title}</h2>
      {data.tasks.map((task) => (
        <Task key={task.id} data={task} />
      ))}
    </div>
  );
}
