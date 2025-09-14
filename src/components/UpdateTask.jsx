import React, { useContext } from "react";
import TaskForm from "./TaskForm";
import { TaskContext } from "../contexts/TaskContext";
import Button from "./Button";
export default function UpdateTask({ task, onClose }) {
  const { taskLists, updateTask, deleteTask } = useContext(TaskContext);
  function onDeleteTask() {
    deleteTask(task);
  }
  return (
    <>
      <TaskForm
        taskLists={taskLists}
        initialValues={task}
        onSubmit={updateTask}
        submitLabel="Guardar"
        onClose={onClose}
      />
      <Button
        children="Eliminar"
        className="bg-red-800 lg:w-1/3 lg:self-center"
        onClick={onDeleteTask}
      ></Button>
    </>
  );
}
