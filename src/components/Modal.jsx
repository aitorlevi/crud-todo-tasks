import React from "react";
import { FaXmark } from "react-icons/fa6";

export default function Modal({ children, onClose }) {
  return (
    <div className="fixed top-0 left-0 flex h-dvh w-dvw items-center justify-center bg-black/80 p-4">
      <div className="bg-surface m-4 flex w-full flex-col gap-4 rounded-lg p-6">
        <div className="flex justify-end">
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
