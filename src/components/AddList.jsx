import React from "react";
import { getLists } from "../services";

export default function AddList() {
  function onSubmit(formData) {
    const formJson = Object.fromEntries(formData.entries());
    if (getLists().includes(formJson.title)) {
      return;
    }
    formJson.tasks = [];
    localStorage.setItem("todos", JSON.stringify(formJson));
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
