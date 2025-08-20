import React from "react";

export default function Add() {
  return (
    <form action="add">
      <label for="title">
        Título
        <input type="text" id="title" />
      </label>
      <label for="description">
        Descripción
        <input type="text" id="description" />
      </label>
      <select>
        {/* TODO AÑADIR BUCLE CON PRIORITIES */}
        <option value="someOption">Una opción</option>
        <option value="otherOption">Otra opción</option>
      </select>
    </form>
  );
}
