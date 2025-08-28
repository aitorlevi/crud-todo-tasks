import React from "react";
import { PRIORITIES } from "../constants";

export default function CreateTask({ taskLists, onCreateTask }) {
  function onSubmit(formData) {
    const formJson = Object.fromEntries(formData.entries());
    if (formJson.priority) formJson.priority = Number(formJson.priority);
    if (formJson.list) formJson.list = Number(formJson.list);
    onCreateTask(formJson);
  }

  return (
    <form action={onSubmit}>
      <h3>Agregar tarea</h3>
      <label>
        Título
        <input name="title" type="text" required />
      </label>
      <label>
        Descripción
        <input name="description" type="text" required />
      </label>
      <select name="priority" required>
        {PRIORITIES.map((priority) => (
          <option key={priority.id} value={priority.id}>
            {priority.value}
          </option>
        ))}
      </select>
      <select name="list" required>
        {taskLists?.map((taskList) => (
          <option key={taskList.id} value={taskList.id}>
            {taskList.title}
          </option>
        ))}
      </select>
      <button type="submit">Añadir</button>
    </form>
  );
}
