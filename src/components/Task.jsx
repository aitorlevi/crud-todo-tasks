import React from "react";
import {
  getStatus,
  getPriorities,
  getTaskBackground,
  getPriorityColor,
} from "../utils/utils";

export default function Task({ data }) {
  return (
    <article className="bg-background-surface flex min-w-4/5 flex-col gap-1 rounded-lg px-3 py-2 backdrop-grayscale">
      <span
        className={`${getTaskBackground(data.status)} text-background-main w-fit self-end rounded-sm px-2 py-0.5 text-end text-xs`}
      >
        {getStatus(data.status)}
      </span>
      <h4 className="">{data.title}</h4>
      <span className="text-text-secondary mb-2">{data.description}</span>
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
    </article>
  );
}
