import React from "react";

export default function AddTask({ priorities }) {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    localStorage.setItem("todos", JSON.stringify(formJson));
  }
  return (
    <form action="add" onSubmit={handleSubmit}>
      <label>
        Título
        <input name="title" type="text" required />
      </label>
      <label>
        Descripción
        <input name="description" type="text" required />
      </label>
      <select name="priority">
        {priorities.map((priority, index) => (
          <option key={index} value={priority}>
            {priority}
          </option>
        ))}
      </select>
      <button type="submit">Añadir</button>
    </form>
  );
}
