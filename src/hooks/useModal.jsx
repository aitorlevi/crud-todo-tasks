import React, { useState } from "react";

export default function useModal() {
  const [contentModal, setContentModal] = useState(null);

  function openModal(content) {
    setContentModal(content);
  }

  function closeModal() {
    setContentModal(null);
  }
  return { contentModal, openModal, closeModal };
}
