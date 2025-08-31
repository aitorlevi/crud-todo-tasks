import React from "react";

export default function LabelInput({
  label,
  name,
  type = "text",
  required = true,
}) {
  return (
    <label>
      {label}
      <input
        className="focus:border-secondary-accent focus:outline-secondary-accent block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline"
        name={name}
        type={type}
        required={required}
      />
    </label>
  );
}
