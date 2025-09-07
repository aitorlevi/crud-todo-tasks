import React from "react";

export default function LabelInput({
  label,
  name,
  defaultValue = "",
  type = "text",
  required = true,
  isTextarea = false,
}) {
  return (
    <label>
      {label}
      {!isTextarea ? (
        <input
          className="focus:border-accent-600 focus:outline-accent-600 block w-full rounded-md border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline"
          name={name}
          type={type}
          defaultValue={defaultValue}
          required={required}
        />
      ) : (
        <textarea
          className="focus:border-accent-600 focus:outline-accent-600 block w-full rounded-md border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline"
          name={name}
          defaultValue={defaultValue}
          required={required}
          rows="3"
        ></textarea>
      )}
    </label>
  );
}
