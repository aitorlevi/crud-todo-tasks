import React from "react";
import Task from "./Task.jsx";
import { FaArrowRight } from "react-icons/fa6";
import Modal from "./Modal.jsx";
import SpecificView from "./SpecificView.jsx";
import useModal from "../hooks/useModal.jsx";

export default function TaskList({ data }) {
  const { contentModal, openModal, closeModal } = useModal();

  return (
    <section className="flex w-full flex-col gap-4">
      <button
        type="button"
        onClick={() => openModal("specificView")}
        className="bg-background-surface flex w-full justify-between rounded-lg p-3"
      >
        <h2>{data.title}</h2>
        <FaArrowRight />
      </button>
      <div className="flex w-full gap-3 overflow-x-scroll">
        {data.tasks.map((task) => (
          <Task key={task.id} data={task} />
        ))}
      </div>
      {contentModal && (
        <Modal onClose={closeModal}>
          <SpecificView data={data} />
        </Modal>
      )}
    </section>
  );
}
