import React from "react";
import Task from "./Task.jsx";

export default function SpecificView({ data }) {
  return (
    <>
      <h2>{data.title}</h2>
      <div className="flex w-full flex-col gap-4 overflow-y-auto">
        {data.tasks.map((task) => (
          <Task key={task.id} data={task} />
        ))}
      </div>
    </>
  );
}
