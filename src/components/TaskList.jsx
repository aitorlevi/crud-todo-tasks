import React from "react";
import Item from "./item.jsx";
import Task from "./Task.jsx";

export default function TaskList({ data }) {
  return (
    <section className="tasklist">
      <h2 className="tasklist__title">{data.title}</h2>
      {data.tasks.map((task) => (
        <Task key={task.id} data={task} />
      ))}
    </section>
  );
}
