import React from "react";
import TaskForm from "./TaskForm";

export default function CreateTask({ taskLists, onCreateTask, onClose }) {
  return (
    <TaskForm
      taskLists={taskLists}
      onSubmit={onCreateTask}
      submitLabel="Añadir"
      onClose={onClose}
    />
  );
}
