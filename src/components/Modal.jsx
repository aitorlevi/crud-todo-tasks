import React from "react";

export default function Modal({ children, onClose }) {
  return (
    <div className="modal">
      <button type="button" onClick={onClose}>
        Cerrar
      </button>
      {children}
    </div>
  );
}
