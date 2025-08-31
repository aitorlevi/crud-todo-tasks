import React from "react";
import Button from "./Button";
import LabelInput from "./LabelInput";

export default function CreateTaskList({ taskLists, onCreateTaskList }) {
  function onSubmit(formData) {
    const formJson = Object.fromEntries(formData.entries());
    if (taskLists.find((list) => list.title === formJson.title)) {
      return;
    }
    onCreateTaskList(formJson);
  }

  return (
    <form className="flex flex-col gap-4" action={onSubmit}>
      <h3 className="mb-3 self-center">Crear lista</h3>
      <LabelInput label="Nombre" name="title" />
      <Button children="Añadir" />
    </form>
  );
}
