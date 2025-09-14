import React from "react";
import Task from "./Task.jsx";
import { FaArrowRight } from "react-icons/fa6";
import Modal from "./Modal.jsx";
import SpecificView from "./SpecificView.jsx";
import useModal from "../hooks/useModal.jsx";

export default function TaskList({ data }) {
  const { contentModal, openModal, closeModal } = useModal();

  return (
    <>
      <section className="flex w-full flex-col gap-4 p-3 lg:min-w-1/3">
        <button
          type="button"
          onClick={() => openModal("specificView")}
          className="bg-background-surface flex w-full justify-between rounded-sm p-3 lg:pointer-events-none"
        >
          <h2>{data.title}</h2>
          <FaArrowRight className="lg:hidden" />
        </button>
        <div className="flex w-full gap-3 overflow-x-scroll px-2 lg:h-[65dvh] lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto">
          {data.tasks.map((task) => (
            <Task key={task.id} data={task} />
          ))}
        </div>
      </section>
      {contentModal && (
        <Modal onClose={closeModal}>
          <SpecificView data={data} />
        </Modal>
      )}
    </>
  );
}
