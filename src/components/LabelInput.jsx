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
        className="focus:border-accent-600 focus:outline-accent-600 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline"
        name={name}
        type={type}
        required={required}
      />
    </label>
  );
}
