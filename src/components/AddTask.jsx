import React from "react";
import { PRIORITIES } from "../constants";

export default function AddTask({ lists }) {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    localStorage.setItem("todos", JSON.stringify(formJson));
  }
  return (
    <form action="add" onSubmit={handleSubmit}>
      <h3>Agregar tarea</h3>
      <label>
        Título
        <input name="title" type="text" required />
      </label>
      <label>
        Descripción
        <input name="description" type="text" required />
      </label>
      <select name="priority">
        {PRIORITIES.map((priority) => (
          <option key={priority.id} value={priority.value}>
            {priority.value}
          </option>
        ))}
      </select>
      <select name="list">
        {lists.map((list, index) => (
          <option key={index} value={list.title}>
            {list.title}
          </option>
        ))}
      </select>
      <button type="submit">Añadir</button>
    </form>
  );
}
