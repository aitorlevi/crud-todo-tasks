import React from "react";
import Task from "./Task.jsx";

export default function TaskList({ data }) {
  return (
    <section className="flex w-full flex-col gap-4">
      <h2 className="bg-surface w-full rounded-lg p-3">{data.title}</h2>
      <div className="flex w-full gap-3 overflow-x-scroll">
        {data.tasks.map((task) => (
          <Task key={task.id} data={task} />
        ))}
      </div>
    </section>
  );
}
