import React from "react";
import { FaXmark } from "react-icons/fa6";

export default function Modal({ children, onClose }) {
  return (
    <div className="fixed top-0 left-0 z-50 flex h-dvh w-dvw items-center justify-center bg-black/80 p-4">
      <div className="bg-background-main m-4 flex h-full w-full flex-col gap-4 rounded-lg p-6 pt-3">
        <div className="-me-3 mb-2 flex justify-end">
          <button
            className="cursor-pointer text-3xl"
            type="button"
            onClick={onClose}
          >
            <FaXmark />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
