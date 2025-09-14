import React from "react";
import { PRIORITIES, STATE } from "../utils/constants";
import Button from "./Button";
import LabelInput from "./LabelInput";

export default function TaskForm({
  taskLists,
  initialValues = {},
  onSubmit,
  submitLabel = "Guardar",
  onClose,
}) {
  function handleSubmit(formData) {
    const formJson = Object.fromEntries(formData.entries());
    if (formJson.list) formJson.list = Number(formJson.list);
    if (initialValues) {
      formJson.id = initialValues.id;
      formJson.order = initialValues.order;
      formJson.date = initialValues.date;
    }
    if (formJson == initialValues) return;
    if (onSubmit(formJson)) {
      onClose();
    }
  }

  return (
    <form
      className="text-md flex flex-col gap-4 overflow-y-scroll lg:overflow-y-auto"
      action={handleSubmit}
    >
      <h3 className="bg-background-main sticky top-0 mb-3 self-center">
        {submitLabel === "Añadir" ? "Agregar tarea" : "Editar tarea"}
      </h3>
      <LabelInput
        label="Nombre"
        name="title"
        defaultValue={initialValues.title || ""}
      />
      <LabelInput
        label="Descripción"
        name="description"
        isTextarea
        defaultValue={initialValues.description || ""}
      />
      <div className="flex justify-between gap-8">
        <label className="flex flex-1 flex-col">
          Prioridad
          <select
            className="bg-background-main focus:outline-accent-600 w-full appearance-none rounded-md border border-gray-700 p-3 py-1 focus:outline-2 focus:-outline-offset-2"
            name="priority"
            required
            defaultValue={initialValues.priority || PRIORITIES[0].id}
          >
            {PRIORITIES.map((priority) => (
              <option key={priority.id} value={priority.id}>
                {priority.value}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-1 flex-col">
          Lista
          <select
            className="bg-background-main focus:outline-accent-600 w-full appearance-none rounded-md border border-gray-700 p-3 py-1 select-none focus:text-white focus:outline-2 focus:-outline-offset-2"
            name="list"
            required
            defaultValue={initialValues.list || (taskLists?.[0]?.id ?? "")}
          >
            {taskLists?.map((taskList) => (
              <option key={taskList.id} value={taskList.id}>
                {taskList.title}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-1 flex-col">
          Estado
          <select
            className="bg-background-main focus:outline-accent-600 w-full appearance-none rounded-md border border-gray-700 p-3 py-1 focus:outline-2 focus:-outline-offset-2"
            name="state"
            required
            defaultValue={initialValues.priority || STATE[0].id}
          >
            {STATE.map((state) => (
              <option key={state.id} value={state.id}>
                {state.value}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Button children={submitLabel} className="lg:w-1/3 lg:self-center" />
    </form>
  );
}
