import React from "react";

export default function AddList({ taskLists, onAddList }) {
  function onSubmit(formData) {
    const formJson = Object.fromEntries(formData.entries());
    if (taskLists.find((list) => list.title === formJson.title)) {
      return;
    }
    onAddList(formJson);
  }

  return (
    <form action={onSubmit}>
      <h3>Crear lista</h3>
      <label>
        Título
        <input name="title" type="text" required />
      </label>
      <button type="submit">Añadir</button>
    </form>
  );
}
