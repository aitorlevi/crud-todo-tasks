import React, { useContext } from "react";
import TaskForm from "./TaskForm";
import TaskContext from "../contexts/TaskContext";
export default function UpdateTask({ task }) {
  const { taskLists, updateTask } = useContext(TaskContext);
  return (
    <TaskForm
      taskLists={taskLists}
      initialValues={task}
      onSubmit={updateTask}
      submitLabel="Guardar"
    />
  );
}
