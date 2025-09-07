import React from "react";
import {
  getStatus,
  getPriorities,
  getTaskBackground,
  getPriorityColor,
} from "../utils/utils";
import useModal from "../hooks/useModal";
import Modal from "./Modal";
import UpdateTask from "./UpdateTask";

export default function Task({ data }) {
  const { contentModal, openModal, closeModal } = useModal();
  return (
    <>
      <article
        onClick={openModal}
        className="bg-background-surface flex min-w-4/5 flex-col gap-1 rounded-sm py-2 pr-2 pl-3 backdrop-grayscale"
      >
        <span
          className={`${getTaskBackground(data.status)} text-background-main w-fit self-end rounded-sm px-2 py-0.5 text-end text-xs`}
        >
          {getStatus(data.status)}
        </span>
        <h4 className="">{data.title}</h4>
        <span className="text-text-secondary mb-2 flex-1">
          {data.description}
        </span>
        <div className="flex flex-col gap-1">
          {data.date && (
            <span className="text-text-secondary text-xs">
              Fecha de creación:{" "}
              <span className="text-text-main">{data.date.split("T")[0]}</span>
            </span>
          )}
          <span className="text-text-secondary text-xs">
            Prioridad:{" "}
            <span className={`${getPriorityColor(data.priority)}`}>
              {getPriorities(data.priority)}
            </span>
          </span>
        </div>
      </article>
      {contentModal && (
        <Modal onClose={closeModal}>
          <UpdateTask task={data} />
        </Modal>
      )}
    </>
  );
}
