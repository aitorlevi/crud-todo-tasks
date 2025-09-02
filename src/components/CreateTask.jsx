import React from "react";
import { PRIORITIES } from "../constants";
import Button from "./Button";
import LabelInput from "./LabelInput";

export default function CreateTask({ taskLists, onCreateTask }) {
  function onSubmit(formData) {
    const formJson = Object.fromEntries(formData.entries());
    if (formJson.list) formJson.list = Number(formJson.list);
    onCreateTask(formJson);
  }

  return (
    <form className="text-md flex flex-col gap-4" action={onSubmit}>
      <h3 className="mb-3 self-center">Agregar tarea</h3>
      <LabelInput label="Nombre" name="title" />
      <LabelInput label="Descripción" name="description" />
      <label className="flex flex-col">
        Prioridad
        <select
          className="bg-background-main focus:outline-accent-600 w-full appearance-none rounded-md p-3 py-1 focus:outline-2 focus:-outline-offset-2"
          name="priority"
          required
        >
          {PRIORITIES.map((priority) => (
            <option key={priority.id} value={priority.id}>
              {priority.value}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col">
        Lista
        <select
          className="bg-background-main focus:outline-accent-600 w-full appearance-none rounded-md p-3 py-1 select-none focus:text-white focus:outline-2 focus:-outline-offset-2"
          name="list"
          required
        >
          {taskLists?.map((taskList) => (
            <option key={taskList.id} value={taskList.id}>
              {taskList.title}
            </option>
          ))}
        </select>
      </label>
      <Button children="Añadir" />
    </form>
  );
}
