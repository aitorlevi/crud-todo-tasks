import React from "react";

export default function Button({ children, type = "submit", onClick = null }) {
  return (
    <button
      className="bg-primary-600 hover:bg-primary-700 rounded-lg px-5 py-2 text-white"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
